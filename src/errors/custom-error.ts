export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(summary: string, detail: string, severity: string) {
    super(summary);
    // Only because we are extending a built in class
    // We need to add the following line!
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { summary: string; detail: string; severity: string }[];
}
