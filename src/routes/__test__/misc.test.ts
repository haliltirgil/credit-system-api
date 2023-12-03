import request from 'supertest';
import { app } from '../../app';

it('returns error requested path not found', async () => {
  return request(app).get('/non-existing-path').send().expect(404);
});
