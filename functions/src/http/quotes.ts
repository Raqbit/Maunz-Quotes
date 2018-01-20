import firestore from '../db';

import * as express from 'express';

import {ErrorCode, ErrorResponse} from '../util/error';
import SuccessResponse from '../util/success';
import HTTPRoute from "./route";

const PAGE_SIZE = 3;

class Quotes extends HTTPRoute {

    constructor() {
        super();
        this.router.get('/getQuotes', (req: express.Request, res: express.Response) => this.getQuotes(req, res));
        this.router.get('/getQuoteCount', (req: express.Request, res: express.Response) => this.getQuoteCount(req, res));
        this.router.get('/getPageCount', (req: express.Request, res: express.Response) => this.getPageCount(req, res));
    }

    /**
     * Returns the quotes on the given page of the given guild
     * @param req - Express Request
     * @param res - Express Response
     */
    private getQuotes(req, res) {
        const guild = req.query['guild'];
        const page = req.query['page'];

        if (!guild || guild === '') {
            const errorResponse = new ErrorResponse(ErrorCode.INVALID_ARGUMENTS, 'Invalid argument', 'Guild must be a valid guild ID');
            res.status(errorResponse.status).json(errorResponse);
            return;
        }

        if (!page || isNaN(Number(page))) {
            const errorResponse = new ErrorResponse(ErrorCode.INVALID_ARGUMENTS, 'Invalid argument', 'Page must be a valid number.');
            res.status(errorResponse.status).json(errorResponse);
            return;
        }

        const quotesRef = firestore.collection(`guilds/${guild}/quotes`);

        quotesRef
            .where('approved', '==', true)
            .orderBy('timestamp')
            .offset(PAGE_SIZE * page)
            .limit(PAGE_SIZE)
            .get()
            .then(querySnapshot => {
                const quotes = [];
                querySnapshot.docs.forEach((doc) => {
                    const quote = doc.data();
                    quote.approved = undefined;
                    quote.id = doc.id;
                    quotes.push(quote);
                });

                if (quotes.length === 0) {
                    const errorResponse = new ErrorResponse(ErrorCode.NO_SUCH_PAGE, `Guild ${guild} does not have a page ${page}`);
                    res.status(errorResponse.status).json(errorResponse);
                    return;
                }

                const response = new SuccessResponse(`Page ${page} of quotes for guild ${guild}`, {quotes});
                res.status(response.status).json(response);
            })
            .catch((error) => {
                const errorResponse = new ErrorResponse(ErrorCode.DB_ERROR, 'Could not get quotes');
                console.log(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }

    /**
     * Returns the total amount of quotes for a guild
     * @param req - Express Request
     * @param res - Express Response
     */
    private getQuoteCount(req, res) {
        const guild = req.query['guild'];

        if (!guild || guild === '') {
            const errorResponse = new ErrorResponse(ErrorCode.INVALID_ARGUMENTS, 'Invalid argument', 'Guild must be a valid guild ID');
            res.status(errorResponse.status).json(errorResponse);
            return;
        }

        const quotesRef = firestore.collection(`guilds/${guild}/quotes`);

        quotesRef
            .where('approved', '==', true)
            .get()
            .then(querySnapshot => {
                const response = new SuccessResponse(`Amount of quotes for guild ${guild}`, {count: querySnapshot.size});
                res.status(response.status).json(response);
            })
            .catch((error) => {
                const errorResponse = new ErrorResponse(ErrorCode.DB_ERROR, 'Could not get quotes');
                console.log(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }

    /**
     * Returns the amount of pages for a guild
     * @param req - Express Request
     * @param res - Express Response
     */
    private getPageCount(req, res) {
        const guild = req.query['guild'];

        if (!guild || guild === '') {
            const errorResponse = new ErrorResponse(ErrorCode.INVALID_ARGUMENTS, 'Invalid argument', 'Guild must be a valid guild ID');
            res.status(errorResponse.status).json(errorResponse);
            return;
        }

        const quotesRef = firestore.collection(`guilds/${guild}/quotes`);

        quotesRef
            .where('approved', '==', true)
            .get()
            .then(querySnapshot => {
                const response = new SuccessResponse(`Amount of pages for guild ${guild}`, {count: Math.ceil(querySnapshot.size / PAGE_SIZE)});
                res.status(response.status).json(response);
            })
            .catch((error) => {
                const errorResponse = new ErrorResponse(ErrorCode.DB_ERROR, 'Could not get quotes');
                console.log(error);
                res.status(errorResponse.status).json(errorResponse);
            });
    }
}

export default Quotes;