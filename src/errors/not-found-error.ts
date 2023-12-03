import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public summary: string, public detail: string, public severity = 'error') {
    super(summary, detail, severity);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ summary: this.summary, detail: this.detail, severity: this.severity }];
  }
}
