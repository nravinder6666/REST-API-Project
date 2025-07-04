const Hapi = require('@hapi/hapi');
const deptController = require('./dept.controller');

// Mock the Sequelize user model
jest.mock('../models', () => {
  const SequelizeMock = require('sequelize-mock');
  const DBConnectionMock = new SequelizeMock();

  const DeptMock = DBConnectionMock.define('Dept', {
    dept_id: 1,
    dept_name: 'IT'
  });

  // Add stubbed methods if needed
DeptMock.$queueResult([
  DeptMock.build({ dept_id: 1, dept_name: 'IT' }),
  DeptMock.build({ dept_id: 2, dept_name: 'HR' }),
]);

  return {
    dept: DeptMock,
  };
});

describe('Dept Controller', () => {
  let server;

  beforeAll(async () => {
    server = Hapi.server({ port: 4000 });

    server.route([
      {
        method: 'GET',
        path: '/dept',
        handler: deptController.getAllDepts,
      },
      {
        method: 'POST',
        path: '/dept',
        handler: deptController.createDept,
      },
      {
        method: 'PUT',
        path: '/dept',
        handler: deptController.updateDept,
      },
      {
        method: 'DELETE',
        path: '/dept/{id}',
        handler: deptController.deleteDept,
      },
      {
        method: 'GET',
        path: '/dept/{id}',
        handler: deptController.getDeptById,
      }
    ]);
  });

  test('GET /dept - returns all depts', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/dept',
    });

    expect(res.statusCode).toBe(200);
    console.log(res.payload);
    const payload = JSON.parse(res.payload);
    expect(Array.isArray(payload)).toBe(true);
    //expect(payload.dept_name).toBe('IT');
  });

  test('POST /dept - creates a user', async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/dept',
      payload: {
        name: 'Jane Smith'
      },
    });

    expect(res.statusCode).toBe(200);
    const payload = JSON.parse(res.payload);
    expect(payload.dept_name).toBe('Jane Smith');
  });

  test('PUT /dept - updates a user', async () => {
    const res = await server.inject({
      method: 'PUT',
      url: '/dept',
      payload: {
        id:1,
        name: 'John Updated',
      }
    });

    expect(res.statusCode).toBe(200);
    const payload = JSON.parse(res.payload);
    expect(payload.message).toBe('Updated Successful');
  });

//   test('PUT /dept - missing fields returns 400', async () => {
//     const res = await server.inject({
//       method: 'PUT',
//       url: '/dept',
//       payload: {
//         name: 'Missing Email',
//       },
//     });

//     expect(res.statusCode).toBe(200);
//     // const payload = JSON.parse(res.payload);
//     // expect(payload.error).toBe('User not found or no changes made.');
//   });

    test('GET by id - returns a user', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/dept/1',
    });

    expect(res.statusCode).toBe(200);
    //console.log(res);
    const payload = JSON.parse(res.payload);
    console.log(payload);
    expect(payload.dept_id).toBe("1");
    expect(payload.dept_name).toBe("IT");
    // expect(payload[0].name).toBe('John Doe');
  });

//   //Delete
    test('DELETE /dept - deletes a department', async () => {
    const res = await server.inject({
      method: 'DELETE',
      url: '/dept/1',
    });
    //console.log(res);
    expect(res.statusCode).toBe(200);

    const payload = JSON.parse(res.payload);
    expect(payload.message).toBe('Deleted Successfully');
  });

});
