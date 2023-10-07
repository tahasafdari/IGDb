import {UserLogin} from './User';

/**
 * AuthMessageResponse Interface
 *
 * Represents a response object typically used for authentication-related operations.
 * It includes a message property and a data property containing user login information.
 */
interface AuthMessageResponse {
  /** A message providing information about the response. */
  message: string;

  /** An object containing user login information. */
  data: UserLogin;
}

export default AuthMessageResponse;
