export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, validationState: {validated: boolean} = {validated: true}) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguishes "handled" errors from "server crashes"

    Error.captureStackTrace(this, this.constructor);
  }
}