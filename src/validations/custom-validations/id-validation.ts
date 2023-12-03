import { body, param } from 'express-validator';

export const paramId = (name: string) => {
  return param(name).isNumeric().withMessage(`Parameter "${name}" must be numeric.`).trim().escape();
};

export const bodyId = (name: string) => {
  return body(name).isNumeric().withMessage(`Parameter "${name}" must be numeric.`).trim().escape();
};
