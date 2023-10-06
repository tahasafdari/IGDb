/**
 * Custom error class extending the base Error class.
 */
export default class CustomError extends Error {
  /**
   * HTTP status code associated with the error.
   * @type {number}
   */
  status = 400;

  /**
   * Creates a new CustomError instance.
   * @param {string} message - The error message.
   * @param {number} status - The HTTP status code.
   */
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
