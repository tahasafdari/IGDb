/**
 * Check if the user is authorized based on the provided user object.
 * @param {UserIdWithToken} user - An object containing user information, including an ID.
 * @throws {GraphQLError} - Throws an error if the user is not authorized.
 * @returns {boolean} - Returns true if the user is authorized.
 */
import {UserIdWithToken} from '../interfaces/User';
import {GraphQLError} from 'graphql';

export default (user: UserIdWithToken): boolean => {
  // Check if the user has a valid ID.
  if (!user.id) {
    // If not authorized, throw a GraphQL error with a custom code.
    throw new GraphQLError('Not authorized', {
      extensions: {code: 'NOT_AUTHORIZED'},
    });
  }
  // If authorized, return true.
  return true;
};
