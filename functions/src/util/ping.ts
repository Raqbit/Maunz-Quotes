import * as express from 'express';
import * as functions from 'firebase-functions';
import SuccessResponse from "./success";

export default functions.https.onRequest((req: express.Request, res: express.Response,) => {
    const response = new SuccessResponse('Pong!', {time: Date.now()});
    res.status(response.status).json(response);
})