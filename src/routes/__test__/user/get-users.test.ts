import request from 'supertest';
import { app } from '../../../app';

describe('GET /', () => {
  it('returns success response 200 when get all users', async () => {
    const res = await request(app).get(`/api/v1/users/`);

    expect(res.statusCode).toBe(200);
  });
});
