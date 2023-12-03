import { body, param } from 'express-validator';

const paramText = (name: string) => {
  return param(name)
    .isString()
    .withMessage(`Parameter "${name}" must be string.`)
    .isLength({ min: 4, max: 256 })
    .withMessage(`Parameter "${name}" should be between 4-256 characters.`)
    .trim()
    .escape();
};

const bodyText = (name: string) => {
  return body(name)
    .isString()
    .withMessage(`Parameter "${name}" must be string.`)
    .isLength({ min: 4, max: 256 })
    .withMessage(`Parameter "${name}" should be between 4-256 characters.`)
    .trim()
    .escape();
};

export { paramText, bodyText };
