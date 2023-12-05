import { body, param, query } from 'express-validator';

const paramDate = (name: string) => {
  return param(name)
    .notEmpty()
    .withMessage('You must enter a date.')
    .isISO8601()
    .toDate()
    .withMessage(`Parameter ${name} must be ISO/Date format.`);
};

const bodyDate = (name: string) => {
  return body(name)
    .notEmpty()
    .withMessage('You must enter a date.')
    .isISO8601()
    .toDate()
    .withMessage(`Parameter ${name} must be ISO/Date format.`);
};

const queryDate = (name: string) => {
  return query(name).isISO8601().toDate().withMessage(`Parameter ${name} must be ISO/Date format.`);
};

export { paramDate, bodyDate, queryDate };
