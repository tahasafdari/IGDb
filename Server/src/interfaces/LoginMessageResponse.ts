import {User} from './User';

/**
 * LoginMessageResponse Interface
 *
 * Represents the response object returned after a user login operation.
 */
export default interface LoginMessageResponse {
  /**
   * An optional JWT token associated with the user's session.
   * This token is typically provided upon successful login.
   */
  token?: string;

  /** A message indicating the result of the login operation (e.g., success or failure). */
  message: string;

  /** The user object representing the logged-in user's details. */
  user: User;
}
