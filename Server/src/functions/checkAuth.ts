import {UserIdWithToken} from '../interfaces/User';
import {GraphQLError} from 'graphql';

export default (user: UserIdWithToken) => {
  if (!user.id) {
    throw new GraphQLError('Not authorized', {
      extensions: {code: 'NOT_AUTHORIZED'},
    });
  }
  return true;
};
