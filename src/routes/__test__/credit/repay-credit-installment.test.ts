import request from 'supertest';
import { app } from '../../../app';
import { createMockUser } from '../../../tests/common/mock-credit-data';
import { User } from '../../../models/user';

describe('POST /:userId/repay', () => {
  it('returns success response 200 when partial payment operation', async () => {
    const mockUser = await createMockUser();

    await request(app).post('/api/v1/credits').send({ userId: mockUser.id, amount: 100, installmentCount: 2 });

    const res = await request(app).post(`/api/v1/credits/${mockUser.id}/repay`).send({ installmentId: 1, amount: 10 });

    expect(res.statusCode).toBe(200);
  });

  /*   it('returns success response 200 when full payment operation', async () => {
    const mockUser = await createMockUser();

    const res = await request(app).post(`/api/v1/credits/${mockUser.id}/repay`).send({ installmentId: 2, amount: 50 });

    expect(res.statusCode).toBe(200);
  }); */
});
