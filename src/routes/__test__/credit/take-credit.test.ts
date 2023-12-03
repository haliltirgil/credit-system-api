import request from 'supertest';
import { app } from '../../../app';

describe('POST /', () => {
  it('returns success response 201 when take credit', async () => {
    const res = await request(app).post('/api/v1/credits').send({ userId: 1 }).expect(201);

    expect(res.statusCode).toBe(201);
  });
});
