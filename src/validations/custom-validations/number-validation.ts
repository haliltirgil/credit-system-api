import { body, param, query } from 'express-validator';

const paramNumber = (name: string) => {
  return param(name)
    .isNumeric()
    .withMessage(`Parameter "${name}" must be numeric.`)
    .isLength({ min: 1, max: 32 })
    .withMessage(`Parameter "${name}" should be between 1-32 characters.`)
    .trim()
    .escape();
};

const bodyNumber = (name: string) => {
  return body(name)
    .isNumeric()
    .withMessage(`Parameter "${name}" must be numeric.`)
    .isLength({ min: 1, max: 32 })
    .withMessage(`Parameter "${name}" should be between 1-32 characters.`)
    .trim()
    .escape();
};

const bodyFloat = (name: string) => {
  return body(name)
    .isFloat()
    .withMessage(`Parameter "${name}" must be float.`)
    .isLength({ min: 1, max: 32 })
    .withMessage(`Parameter "${name}" should be between 1-32 characters.`)
    .trim()
    .escape();
};

const queryNumber = (name: string) => {
  return query(name)
    .isNumeric()
    .withMessage(`Parameter "${name}" must be numeric.`)
    .isLength({ min: 1, max: 32 })
    .withMessage(`Parameter "${name}" should be between 1-32 characters.`)
    .trim()
    .escape();
};

export { paramNumber, bodyNumber, bodyFloat, queryNumber };
