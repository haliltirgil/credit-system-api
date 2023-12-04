import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public summary: string, public detail: string, public severity = 'error') {
    super(summary, detail, severity);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ summary: this.summary, detail: this.detail, severity: this.severity }];
  }
}
