import {GraphQLError} from 'graphql';
import LoginMessageResponse from '../../interfaces/LoginMessageResponse';
import {User, UserIdWithToken} from '../../interfaces/User';
import fetchData from '../../functions/fetchData';
import AuthMessageResponse from '../../interfaces/AuthMessageResponse';

export default {
  Query: {
    /**
     * Retrieve a list of users.
     * @returns An array of users
     */
    users: async () => {
      const users = await fetchData<AuthMessageResponse>(
        `${process.env.AUTH_URL}/users`
      );
      return users;
    },

    /**
     * Retrieve a user by their ID.
     * @param _ Unused
     * @param args Arguments containing id
     * @returns The requested user
     * @throws GraphQLError if the user is not found
     */
    userById: async (_: undefined, args: {id: string}) => {
      const response = await fetch(`${process.env.AUTH_URL}/users/${args.id}`);
      if (!response.ok) {
        throw new GraphQLError('User not found', {
          extensions: {code: 'NOT_FOUND'},
        });
      }
      const user = (await response.json()) as User;
      return user;
    },

    /**
     * Check the validity of a user's token.
     * @param _ Unused
     * @param args Arguments containing token
     * @returns The user associated with the token
     * @throws GraphQLError if the token is not valid
     */
    checkToken: async (_: undefined, args: UserIdWithToken) => {
      const response = await fetch(`${process.env.AUTH_URL}/users/token`, {
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      });
      if (!response.ok) {
        throw new GraphQLError('Token not valid', {
          extensions: {code: 'NOT_FOUND'},
        });
      }
      const userFromAuthServer = (await response.json()) as User;
      return userFromAuthServer;
    },
  },
  Mutation: {
    /**
     * Login a user with the provided credentials.
     * @param _ Unused
     * @param args Arguments containing credentials (email and password)
     * @returns A message response with the user and token
     */
    login: async (
      _: undefined,
      args: {credentials: {email: string; password: string}}
    ) => {
      const options: RequestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(args.credentials),
      };
      const user = await fetchData<LoginMessageResponse>(
        `${process.env.AUTH_URL}/auth/login`,
        options
      );
      return user;
    },

    /**
     * Register a new user with the provided details.
     * @param _parent Unused
     * @param args Arguments containing user details
     * @returns A message response with the user and token
     */
    register: async (_parent: undefined, args: {user: User}) => {
      const options: RequestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(args.user),
      };
      const response = await fetchData<LoginMessageResponse>(
        `${process.env.AUTH_URL}/users`,
        options
      );

      return response;
    },

    /**
     * Update a user's information.
     * @param _ Unused
     * @param args Arguments containing user details
     * @param user User with a valid token
     * @returns The updated user
     */
    updateUser: async (
      _: undefined,
      args: {user: User}, // Input
      user: UserIdWithToken // Context
    ) => {
      const options: RequestInit = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(args.user),
      };
      const response = await fetchData<User>(
        `${process.env.AUTH_URL}/users`,
        options
      );
      return response;
    },

    /**
     * Delete a user's account.
     * @param _ Unused
     * @param __ Unused
     * @param user User with a valid token
     * @returns The deleted user
     */
    deleteUser: async (
      _: undefined,
      __: undefined, // Input
      user: UserIdWithToken // Context
    ) => {
      const options: RequestInit = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await fetchData<User>(
        `${process.env.AUTH_URL}/users`,
        options
      );
      return response;
    },

    /**
     * Update a user's information as an admin.
     * @param _ Unused
     * @param args Arguments containing user details
     * @param user User with a valid token and admin role
     * @returns The updated user
     */
    updateUserAsAdmin: async (
      _: undefined,
      args: User,
      user: UserIdWithToken
    ) => {
      if (!user.token || !user.role.includes('admin')) {
        return null;
      }
      const options: RequestInit = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
          role: user.role,
        },
        body: JSON.stringify(args),
      };
      const response = await fetchData<User>(
        `${process.env.AUTH_URL}/users`,
        options
      );
      return response;
    },

    /**
     * Delete a user's account as an admin.
     * @param _ Unused
     * @param args Arguments containing user details
     * @param user User with a valid token and admin role
     * @returns The deleted user
     */
    deleteUserAsAdmin: async (
      _: undefined,
      args: User,
      user: UserIdWithToken
    ) => {
      if (!user.token || !user.role.includes('admin')) {
        return null;
      }
      const options: RequestInit = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
          role: user.role,
        },
      };
      const response = await fetchData<User>(
        `${process.env.AUTH_URL}/users/${args.id}`,
        options
      );
      return response;
    },
  },
};
