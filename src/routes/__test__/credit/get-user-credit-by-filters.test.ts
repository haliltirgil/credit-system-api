import request from 'supertest';
import { app } from '../../../app';
import { MOCK_USER_ID, createMockUser } from '../../../tests/common/mock-credit-data';

describe('GET /:userId/credits', () => {
  it('returns 200 success response when get user credits', async () => {
    const mockUser = await createMockUser();
    const res = await request(app).get(
      `/api/v1/credits/${mockUser.id}/status/?status=0&startDate=2022-10-10&limit=10&page=1`
    );

    expect(res.statusCode).toBe(200);
    mockUser.remove();
  });

  it('returns 404 NotFoundError response when get user credits', async () => {
    const res = await request(app).get(
      `/api/v1/credits/${MOCK_USER_ID}/status/?status=0&startDate=2022-10-10&limit=10&page=1`
    );

    expect(res.statusCode).toBe(404);
  });
});
