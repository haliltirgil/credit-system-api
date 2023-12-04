import { CustomError } from './custom-error';

export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor() {
    super('Authorization Error', 'You are not authorized to use this API.', 'error');

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ summary: 'Authorization Error', detail: 'You are not authorized to use this API.', severity: 'error' }];
  }
}
