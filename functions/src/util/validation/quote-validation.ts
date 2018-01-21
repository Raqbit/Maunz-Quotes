import {check, query} from 'express-validator/check';
import {handleValidationError} from './validation-error';

export function getQuotesValidation() {
  return [
    validateGuild(query),
    query('page')
      .exists().withMessage('You must specify a page number')
      .trim()
      .isNumeric()
      .custom(value => value >= 0).withMessage('You must specify a valid page number'),
    handleValidationError()
  ];
}

export function getQuoteCountValidation() {
  return [
    validateGuild(query),
    handleValidationError()
  ];
}

export function getPageCountValidation() {
  return [
    validateGuild(query),
    handleValidationError()
  ];
}

export function addQuoteValidation() {
  return [
    validateGuild(check),
    check('title')
      .exists()
      .trim()
      .isLength({min: 10, max: 30}),
    check('quote')
      .exists()
      .trim(),
    check('submitter')
      .exists()
      .trim(),
    handleValidationError()
  ];
}

function validateGuild(fn) {
  return fn('guild')
    .exists().withMessage('You must specify a guild ID')
    .trim()
    .isNumeric();
}
