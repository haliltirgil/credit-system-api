import { paramId } from './custom-validations/id-validation';
import { bodyText } from './custom-validations/text-validation';

export class UserValidation {
  public static createUser = [bodyText('firstName'), bodyText('lastName')];

  public static getUserCredits = [paramId('userId')];
}
