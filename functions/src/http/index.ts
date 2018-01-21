import * as functions from 'firebase-functions';

import * as express from 'express';
import * as cors from 'cors';
import Quotes from './quotes';

const app = express();

app.use(cors({origin: true}));

const quotes = new Quotes();
app.use('/quotes', quotes.router);

// Adds a slash to the end of the path to not make express fail
const api = functions.https.onRequest((req, res) => {
  if (!req.path) {
    req.url = `/${req.url}` // prepend '/' to keep query params if any
  }

  return app(req,res);
});

export const httpAPI = functions.https.onRequest(api);
