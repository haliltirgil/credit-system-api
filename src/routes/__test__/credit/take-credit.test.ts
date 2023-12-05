import request from 'supertest';
import { app } from '../../../app';

/**
 * Create operation realized from repay test
 */
describe('POST /', () => {
  it('returns 404 NotFoundError for user object', async () => {
    const res = await request(app).post('/api/v1/credits').send({ userId: 12345, amount: 100, installmentCount: 5 });

    expect(res.statusCode).toBe(404);
  });
});
