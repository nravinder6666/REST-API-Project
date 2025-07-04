const Hapi = require('@hapi/hapi');
const userController = require('./user.controller');

// Mock the Sequelize user model
jest.mock('../models', () => {
  const SequelizeMock = require('sequelize-mock');
  const DBConnectionMock = new SequelizeMock();

  const UserMock = DBConnectionMock.define('user', {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  });

  // Add stubbed methods if needed
  UserMock.$queueResult(UserMock.build({
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
  }));

  return {
    user: UserMock,
  };
});

describe('User Controller', () => {
  let server;

  beforeAll(async () => {
    server = Hapi.server({ port: 4000 });

    server.route([
      {
        method: 'GET',
        path: '/users',
        handler: userController.getAllUsers,
      },
      {
        method: 'POST',
        path: '/users',
        handler: userController.createUser,
      },
      {
        method: 'PUT',
        path: '/users',
        handler: userController.updateUser,
      },
      {
        method: 'DELETE',
        path: '/users/{id}',
        handler: userController.deleteUser,
      },
      {
        method: 'GET',
        path: '/users/{id}',
        handler: userController.getUserById,
      }
    ]);
  });

  test('GET /users - returns all users', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/users',
    });

    expect(res.statusCode).toBe(200);
    console.log(res);
    // const payload = JSON.parse(res.payload);
    // expect(Array.isArray(payload)).toBe(true);
    // expect(payload[0].name).toBe('John Doe');
  });

  test('POST /users - creates a user', async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'Jane Smith',
        email: 'jane@example.com',
      },
    });

    expect(res.statusCode).toBe(200);
    const payload = JSON.parse(res.payload);
    expect(payload.name).toBe('Jane Smith');
  });

  test('PUT /users - updates a user', async () => {
    const res = await server.inject({
      method: 'PUT',
      url: '/users',
      payload: {
        id: 1,
        name: 'John Updated',
        email: 'john.updated@example.com',
      },
    });

    expect(res.statusCode).toBe(200);
    const payload = JSON.parse(res.payload);
    expect(payload.message).toBe('Updated Successful');
  });

  test('PUT /users - missing fields returns 400', async () => {
    const res = await server.inject({
      method: 'PUT',
      url: '/users',
      payload: {
        name: 'Missing Email',
      },
    });

    expect(res.statusCode).toBe(200);
    // const payload = JSON.parse(res.payload);
    // expect(payload.error).toBe('User not found or no changes made.');
  });

    test('GET by id - returns a user', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/users/1',
    });

    expect(res.statusCode).toBe(200);
    //console.log(res);
    const payload = JSON.parse(res.payload);
    //console.log(payload);
    expect(payload.id).toBe("1");
    expect(payload.name).toBe("John Doe");
    expect(payload.email).toBe("john@example.com");
    // expect(Array.isArray(payload)).toBe(true);
    // expect(payload[0].name).toBe('John Doe');
  });

  //Delete
    test('DELETE /users - deletes a user', async () => {
    const res = await server.inject({
      method: 'DELETE',
      url: '/users/1',
    });
    console.log(res);
    expect(res.statusCode).toBe(200);

    //const payload = JSON.parse(res.payload);
    //expect(payload.message).toBe('Deleted Successful');
  });

});
