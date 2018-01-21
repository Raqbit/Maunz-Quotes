import {ErrorCode, ErrorResponse} from '../response/error';
import {validationResult} from 'express-validator/check';
import * as express from 'express';

export function handleValidationError() {
  return (function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      validationResult(req).throw();
      next();
    } catch (e) {
      const errorMsg = new ErrorResponse(ErrorCode.VALIDATION_ERROR, 'Invalid argument', e.mapped());
      res.status(errorMsg.status).json(errorMsg);
      return;
    }
  });
}
