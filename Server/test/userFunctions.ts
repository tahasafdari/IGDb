/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import expect from 'expect';
import {UserTest} from '../src/interfaces/User';
import ErrorResponse from '../src/interfaces/ErrorResponse';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';
import randomstring from 'randomstring';

/**
 * Retrieves a list of users from the server.
 * @param url - The URL to retrieve the users from.
 * @returns A Promise that resolves with an array of UserTest objects.
 */
const getUsers = (url: string | Function): Promise<UserTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: '{ users { id user_name email profile_image favourite_games} }',
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const users = response.body.data.users;
          expect(users).toBeInstanceOf(Array);
          expect(users[0]).toHaveProperty('id');
          expect(users[0]).toHaveProperty('user_name');
          expect(users[0]).toHaveProperty('email');
          expect(users[0]).toHaveProperty('profile_image');
          expect(users[0]).toHaveProperty('favourite_games');
          resolve(response.body.data.users);
        }
      });
  });
};

/**
 * Retrieves a user by their ID.
 * @param url - The URL of the GraphQL API.
 * @param id - The ID of the user to retrieve.
 * @returns A Promise that resolves to the retrieved user.
 */
const getUserById = (url: string | Function, id: string): Promise<UserTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `query UserById($userByIdId: ID!) {
            userById(id: $userByIdId) {
              id
              user_name
              email
              profile_image
              favourite_games
            }
          }`,
        variables: {
          userByIdId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const user = response.body.data.userById;
          expect(user).toHaveProperty('id');
          expect(user).toHaveProperty('user_name');
          expect(user).toHaveProperty('email');
          expect(user).toHaveProperty('profile_image');
          expect(user).toHaveProperty('favourite_games');
          resolve(user);
        }
      });
  });
};

/**
 * Makes a POST request to register a new user.
 * @param url - The URL to make the request to.
 * @param user - The user object to register.
 * @returns A Promise that resolves to a LoginMessageResponse object.
 */
const postUser = (
  url: string | Function,
  user: UserTest
): Promise<LoginMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `mutation Register($user: UserInput!) {
            register(user: $user) {
              message
              user {
                id
                user_name
                email
              }
            }
          }`,
        variables: {
          user: {
            user_name: user.user_name,
            email: user.email,
            password: user.password,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const data = response.body.data.register;
          expect(data).toHaveProperty('message');
          expect(data).toHaveProperty('user');
          expect(data.user).toHaveProperty('id');
          expect(data.user.user_name).toBe(user.user_name);
          expect(data.user.email).toBe(user.email);
          resolve(response.body.data.register);
        }
      });
  });
};

/**
 * Logs in a user by sending a GraphQL mutation to the server with the user's credentials.
 * @param url - The URL to send the GraphQL mutation to.
 * @param user - The user's credentials.
 * @returns A Promise that resolves to a LoginMessageResponse object containing the login message, token, and user information.
 */
const loginUser = (
  url: string | Function,
  user: UserTest
): Promise<LoginMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `mutation Login($credentials: Credentials!) {
        login(credentials: $credentials) {
          message
          token
          user {
            email
            id
            user_name
          }
        }
      }`,
        variables: {
          credentials: {
            email: user.email,
            password: user.password,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const data = response.body.data.login;
          expect(data).toHaveProperty('message');
          expect(data).toHaveProperty('token');
          expect(data).toHaveProperty('user');
          expect(data.user).toHaveProperty('id');
          expect(data.user.user_name).toBe(user.user_name);
          expect(data.user.email).toBe(user.email);
          resolve(response.body.data.login);
        }
      });
  });
};

/**
 * Deletes a user.
 * @param url - The URL of the server.
 * @param token - The authorization token for the user.
 * @returns A Promise that resolves to an ErrorResponse object.
 */
const deleteUser = (
  url: string | Function,
  token: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Authorization', `bearer ${token}`)
      .send({
        query: `mutation DeleteUser {
            deleteUser {
                message
                user {
                    id
                    user_name
                    email
                }
            }
        }`,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const data = response.body.data.deleteUser;
          expect(data).toHaveProperty('message');
          expect(data).toHaveProperty('user');
          resolve(response.body.data.deleteUser);
        }
      });
  });
};

/**
 * Deletes a user as an admin.
 * @param url - The URL to send the request to.
 * @param id - The ID of the user to delete.
 * @param token - The authorization token.
 * @returns A Promise that resolves to an ErrorResponse object.
 */
const adminDeleteUser = (
  url: string | Function,
  id: string,
  token: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Authorization', `bearer ${token}`)
      .send({
        query: `mutation DeleteUserAsAdmin($deleteUserAsAdminId: ID!) {
                deleteUserAsAdmin(id: $deleteUserAsAdminId) {
                  user {
                    id
                  }
                }
              }`,
        variables: {
          deleteUserAsAdminId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const data = response.body.data.deleteUserAsAdmin;
          expect(data.user.id).toBe(id);
          resolve(response.body.data.deleteUser);
        }
      });
  });
};

/**
 * Updates a user.
 * @param url - The URL to send the request to.
 * @param token - The authorization token to include in the request header.
 * @returns A Promise that resolves to an ErrorResponse object.
 */
const putUser = (
  url: string | Function,
  token: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    const newUserName = 'updatedUserName' + randomstring.generate(6);
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send({
        query: `mutation UpdateUser($user: UserModify!) {
                updateUser(user: $user) {
                  message
                  user {
                    id
                    user_name
                    email
                  }
                }
              }`,
        variables: {
          user: {
            user_name: newUserName,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.updateUser;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.user.user_name).toBe(newUserName);
          resolve(response.body.data.updateUser);
        }
      });
  });
};

export {
  getUsers,
  getUserById,
  postUser,
  loginUser,
  deleteUser,
  adminDeleteUser,
  putUser,
};
