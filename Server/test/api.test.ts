import app from '../src/app';
import {
  adminDeleteUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  postUser,
  putUser,
} from './userFunctions';
import {UserTest} from '../src/interfaces/User';
import mongoose from 'mongoose';
import {getNotFound} from './testFunctions';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';
import randomstring from 'randomstring';
require('dotenv').config();
import jwt from 'jsonwebtoken';

describe('Testing graphql api', () => {
  beforeAll(async () => {
    console.log(process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // test not found
  it('responds with a not found message', async () => {
    await getNotFound(app);
  });

  let userData: LoginMessageResponse;
  let userData2: LoginMessageResponse;
  let adminData: LoginMessageResponse;

  const testUser: UserTest = {
    user_name: 'testUser' + randomstring.generate(6),
    email: randomstring.generate(6) + '@test.fi',
    password: 'testPassword',
  };
  const testUser2: UserTest = {
    user_name: 'testUser' + randomstring.generate(6),
    email: randomstring.generate(6) + '@test.fi',
    password: 'testPassword',
  };
  const testAdmin: UserTest = {
    user_name: 'Admin',
    email: 'admin@metropolia.fi',
    password: 'admin',
  };

  it('should create a new user', async () => {
    await postUser(app, testUser);
  });

  it('should create second user', async () => {
    await postUser(app, testUser2);
  });

  it('should login as a user', async () => {
    userData = await loginUser(app, testUser);
  });

  it('should login as a second user', async () => {
    userData2 = await loginUser(app, testUser2);
  });
  it('should login as an admin', async () => {
    adminData = await loginUser(app, testAdmin);
  });

  it('token should have a role', async () => {
    const dataFromToken = jwt.verify(
      userData.token!,
      process.env.JWT_SECRET as string
    );
    expect(dataFromToken).toHaveProperty('role');
  });

  it('should return array of users', async () => {
    await getUsers(app);
  });

  it('should return user by id', async () => {
    await getUserById(app, userData.user.id!);
  });

  it('should update user', async () => {
    await putUser(app, userData.token!);
  });

  it('should delete current user', async () => {
    await deleteUser(app, userData.token!);
  });
  it('should delete the user as admin', async () => {
    await adminDeleteUser(app, userData2.user.id!, adminData.token!);
  });
});
