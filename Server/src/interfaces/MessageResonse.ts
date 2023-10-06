/**
 * MessageResponse Interface
 *
 * Represents a generic response object with a message property.
 */
export default interface MessageResponse {
  /** A message providing information about the response. */
  message: string;

  /**
   * An optional numeric identifier.
   * This property may be used to include additional identification or context in the response, but it's not required.
   */
  id?: number;
}
