import request from 'supertest';
import { app } from '../../../app';

describe('POST /:userId/repay', () => {
  it('returns success response 201 when take credit', async () => {
    const res = await request(app).post('/api/v1/credits/:userId/repay').send({ amount: 1 });

    expect(res.statusCode).toBe(201);
  });
});
