import { CustomError } from './custom-error';

export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor(public summary: string, public detail: string, public severity = 'error') {
    super(summary, detail, severity);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ summary: this.summary, detail: this.detail, severity: this.severity }];
  }
}
