import { User } from '../../models/user';

export const MOCK_USER_ID = 21;

export async function createMockUser() {
  const user = new User();
  user.firstName = 'firstNameForGetFilters';
  user.lastName = 'ForGetFilters';
  await user.save();

  return user;
}
