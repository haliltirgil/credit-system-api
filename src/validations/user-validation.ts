import { bodyText } from './custom-validations/text-validation';

/**
 * TODO: write validations
 */
export class UserValidation {
  public static createUser = [bodyText('firstName')];
}
