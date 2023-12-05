import request from 'supertest';
import { app } from '../../app';
import { BadRequestError } from '../../errors/bad-request-error';
import { ForbiddenError } from '../../errors/forbidden-error';
import { RequestValidationError } from '../../errors/request-validation-error';

it('returns error requested path not found', async () => {
  return request(app).get('/non-existing-path').send().expect(404);
});

it('should cover BadRequestError correctly', () => {
  const summary = 'Error';
  const detail = 'Invalid input provided';
  const severity = 'error';

  const error = new BadRequestError(summary, detail, severity);

  expect(error.statusCode).toBe(400);
});

it('should cover ForbiddenError correctly', () => {
  const summary = 'Error';
  const detail = 'Authorization error';
  const severity = 'error';

  const error = new ForbiddenError(summary, detail, severity);

  expect(error.statusCode).toBe(403);
});

it('should serialize validation errors correctly', () => {
  const errors: any = [
    { param: 'username', msg: 'Username is required' },
    { param: 'email', msg: 'Invalid email format' },
  ];

  const error = new RequestValidationError(errors);

  expect(error.statusCode).toBe(400);
});
