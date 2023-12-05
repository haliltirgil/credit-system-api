import { BadRequestError } from '../errors/bad-request-error';
import { ForbiddenError } from '../errors/forbidden-error';
import { NotFoundError } from '../errors/not-found-error';

export const MIN_LENGTH = 1;
export const MAX_LENGTH = 100;

export const INTEREST_VALUE = 1.5;
export const OVERDATE = 1;

export const CUSTOM_ERRORS = [NotFoundError, BadRequestError, ForbiddenError];
