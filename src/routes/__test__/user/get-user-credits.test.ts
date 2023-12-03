import request from 'supertest';
import { app } from '../../../app';

describe('GET /:userId/credits', () => {
  it('returns success response 200 when get user credits', async () => {
    const res = await request(app).get('/api/v1/users/:userId/credits');

    expect(res.statusCode).toBe(201);
  });
});
