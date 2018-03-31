import firestore from '../db';

import * as express from 'express';

import {ErrorCode, ErrorResponse} from '../util/response/error';
import SuccessResponse from '../util/response/success';
import HTTPRoute from '../util/route';
import {
  addQuoteValidation,
  getPageCountValidation,
  getQuoteCountValidation,
  getQuotesValidation
} from '../util/validation/quote-validation';
import Quote from '../util/model/quote';
import {CollectionReference} from '@google-cloud/firestore';

const PAGE_SIZE = 3;

class Quotes extends HTTPRoute {

  constructor() {
    super();
    this.router.get('/', getQuotesValidation(),
      (req: express.Request, res: express.Response) => this.getQuotes(req, res));

    this.router.post('/', addQuoteValidation(),
      (req: express.Request, res: express.Response) => this.addQuote(req, res));

    this.router.get('/quotes/count', getQuoteCountValidation(),
      (req: express.Request, res: express.Response) => this.getQuoteCount(req, res));

    this.router.get('/quotes/pagecount', getPageCountValidation(),
      (req: express.Request, res: express.Response) => this.getPageCount(req, res));

  }

  /**
   * Returns the quotes on the given page of the given guild
   * @param req - Express Request
   * @param res - Express Response
   */
  private getQuotes(req: express.Request, res: express.Response) {
    const guild = req.query['guild'];
    const page = req.query['page'];

    const quotesRef: CollectionReference = firestore.collection(`guilds/${guild}/quotes`);

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
  private getQuoteCount(req: express.Request, res: express.Response) {
    const guild = req.query['guild'];

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
  private getPageCount(req: express.Request, res: express.Response) {
    const guild = req.query['guild'];

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

  /**
   * Add a quote to the database
   * @param req - Express Request
   * @param res - Express Response
   */
  private addQuote(req: express.Request, res: express.Response) {
    const guild = req.body['guild'];
    const title = req.body['title'];
    const quote = req.body['quote'];
    const submitter = req.body['submitter'];

    console.log('Adding quote...');

    const quotesRef = firestore.collection(`guilds/${guild}/quotes`);

    // Firebase doesn't accept "new Quote" >.>
    const newQuote = <Quote> {
      title,
      quote,
      submitter
    };

    newQuote.approved = false;
    newQuote.timestamp = Date.now();

    quotesRef.add(newQuote)
      .then(() => {
        const response = new SuccessResponse('Added quote to the database');
        res.status(response.status).json(response);
      })
      .catch((error) => {
        const errorResponse = new ErrorResponse(ErrorCode.DB_ERROR, 'Could not add quote');
        console.log(error);
        res.status(errorResponse.status).json(errorResponse);
      });
  }
}


export default Quotes;
