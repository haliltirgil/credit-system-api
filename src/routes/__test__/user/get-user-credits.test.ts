import request from 'supertest';
import { app } from '../../../app';

describe('GET /:userId/credits', () => {
  it('returns success response 200 when get user credits', async () => {
    const user = await request(app).post('/api/v1/users').send({ firstName: 'test', lastName: 'test' }).expect(201);
    const res = await request(app).get(`/api/v1/users/${user.body.result.id}/credits`);

    expect(res.statusCode).toBe(200);
  });

  it('returns 404 NotFoundError response when user not found', async () => {
    const res = await request(app).get(`/api/v1/users/6666/credits`);

    expect(res.statusCode).toBe(404);
  });
});
