import * as functions from 'firebase-functions';

import * as express from 'express';
import * as cors from 'cors';
import Quotes from './quotes';

const app = express();

app.use(cors({ origin: true }));

const quotes = new Quotes();
app.use('/quotes', quotes.router);

export const httpAPI = functions.https.onRequest(app);