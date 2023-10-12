/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import expect from 'expect';
import {UserTest} from '../src/interfaces/User';
import ErrorResponse from '../src/interfaces/ErrorResponse';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';
import randomstring from 'randomstring';

const getUsers = (url: string | Function): Promise<UserTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({query: '{ users { id user_name email } }'})
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const users = response.body.data.users;
          expect(users).toBeInstanceOf(Array);
          expect(users[0]).toHaveProperty('id');
          expect(users[0]).toHaveProperty('user_name');
          expect(users[0]).toHaveProperty('email');
          resolve(response.body.data.users);
        }
      });
  });
};

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
          console.log(response.body);
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
