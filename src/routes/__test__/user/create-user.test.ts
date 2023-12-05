import request from 'supertest';
import { app } from '../../../app';

describe('POST /', () => {
  it('returns success response 201 when create user', async () => {
    const res = await request(app).post('/api/v1/users').send({ firstName: 'test', lastName: 'test' }).expect(201);

    expect(res.statusCode).toBe(201);
  });
});
