import MessageResponse from './MessageResonse';
/**
 * ErrorResponse Interface
 *
 * Represents an error response object that extends the MessageResponse interface.
 * It includes an optional property for the stack trace of the error.
 */
export default interface ErrorResponse extends MessageResponse {
  /** An optional string containing the stack trace of the error. */
  stack?: string;
}
