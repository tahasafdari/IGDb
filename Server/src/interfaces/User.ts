import {Document} from 'mongoose';
/**
 * User Interface
 *
 * Represents a user document in the MongoDB database.
 */
interface User extends Document {
  /** The user's username. */
  user_name: string;
  /** The user's email address. */
  email: string;
  /** The user's password. */
  password: string;
  /** The URL of the user's profile image. */
  profile_image: string;
  /** An array of the user's favorite games. */
  favourite_games: string[];
}

/**
 * UserTest Interface
 *
 * Represents a user object, often used in testing or as a GraphQL response.
 */
interface UserTest {
  /** The unique identifier of the user. */
  id?: string;
  /** The user's username (in snake_case, as returned from GraphQL). */
  user_name?: string;
  /** The user's username (in camelCase, as used in GraphQL variables). */
  userName?: string;
  /** The user's email address. */
  email?: string;
  /** The user's password. */
  password?: string;
  /** A JWT token associated with the user. */
  token?: string;
}

/**
 * UserIdWithToken Interface
 *
 * Represents user information with an associated JWT token.
 */
interface UserIdWithToken {
  /** The unique identifier of the user. */
  id: string;
  /** A JWT token. */
  token: string;
  /** The user's role, which can be 'admin' or 'user'. */
  role: 'admin' | 'user';
}

/**
 * UserOfReview Interface
 *
 * Represents a user object typically used in the context of reviews.
 */
interface UserOfReview {
  /** The unique identifier of the user. */
  id?: string;
  /** The user's username. */
  user_name: string;
}

/**
 * UserLogin Interface
 *
 * Represents user login credentials.
 */
interface UserLogin {
  /** The user's email address. */
  email: string;
  /** The user's password. */
  password: string;
  /** The unique identifier of the user. */
  id: string;
}

export {User, UserTest, UserIdWithToken, UserLogin, UserOfReview};
