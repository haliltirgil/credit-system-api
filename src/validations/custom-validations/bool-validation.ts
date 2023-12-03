import { body, param } from 'express-validator';

const paramBool = (name: string) => {
  return param(name).isBoolean().withMessage(`Parameter "${name}" must be boolean (true or false).`).trim().escape();
};

const bodyBool = (name: string) => {
  return body(name).isBoolean().withMessage(`Parameter "${name}" must be boolean (true or false).`).trim().escape();
};

export { paramBool, bodyBool };
