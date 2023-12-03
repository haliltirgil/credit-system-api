import { CUSTOM_ERRORS } from '../constants/const-variables';

/**
 * Catches and handles custom errors based on predefined error types.
 *
 * @param error - The error object to be caught and handled.
 * @returns An object containing statusCode, summary, detail, and severity properties based on the error type.
 * If the error is not a custom error, it returns a generic error response with a status code of 500.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function catchError(error: any) {
  let response;
  // eslint-disable-next-line no-restricted-syntax
  for (const errorType of CUSTOM_ERRORS) {
    if (error instanceof errorType) {
      response = {
        statusCode: error.statusCode,
        body: { summary: error.summary, detail: error.detail, severity: error.severity },
      };
      break;
    }
  }

  if (!response) {
    response = {
      statusCode: 500,
      body: error,
    };
  }

  return response;
}
