import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Validation Error', 'We could not validate the provided parameter.', 'error');

    // Only because we are extending a built in class
    // We need to add the following line!
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { summary: `Validation Error - ${err.param}`, detail: `${err.msg}`, severity: 'error' };
    });
  }
}
