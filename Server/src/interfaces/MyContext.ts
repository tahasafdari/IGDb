import {UserIdWithToken} from './User';

/**
 * MyContext Interface
 *
 * Represents the context object used in the application, which may contain user-related information.
 */
interface MyContext {
  /**
   * An optional object containing a user's unique identifier and associated JWT token.
   * This information is typically used for authentication and authorization.
   */
  userIdWithToken?: UserIdWithToken;
}

export {MyContext};
