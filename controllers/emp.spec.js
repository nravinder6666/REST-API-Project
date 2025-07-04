const Hapi = require('@hapi/hapi');
const empController = require('./emp.controller');


// Mock the Sequelize user model
jest.mock('../models', () => {
  const SequelizeMock = require('sequelize-mock');
  const DBConnectionMock = new SequelizeMock();
 const DeptMock = DBConnectionMock.define('dept', {
    dept_id: 1,
    dept_name: 'IT',
  });

  const EmpMock = DBConnectionMock.define('emp', { emp_name: 'Ravi',   email:'r@r.com',
  dept_id: DeptMock.build({ dept_id: 1, dept_name: 'IT' })
  });

  // Add stubbed methods if needed
  EmpMock.$queueResult([
  EmpMock.build({ dept_id: DeptMock.build({ dept_id: 1, dept_name: 'IT' }), emp_name: 'Ravi',   email:'r@r.com'}),
  EmpMock.build({ dept_id:DeptMock.build({ dept_id: 1, dept_name: 'IT' }), emp_name: 'Mahesh', email:'m@m.com'}),
]);

  return {
    emp: EmpMock,
  };
});

describe('Emp Controller', () => {
  let server;

  beforeAll(async () => {
    server = Hapi.server({ port: 4000 });

    server.route([
      {
        method: 'GET',
        path: '/emp',
        handler: empController.getAllEmps,
      }
      ,
      {
        method: 'POST',
        path: '/emp',
        handler: empController.createEmp,
      },
      {
        method: 'PUT',
        path: '/emp',
        handler: empController.updateEmp,
      },
      {
        method: 'DELETE',
        path: '/emp/{id}',
        handler: empController.deleteEmp,
      },
      {
        method: 'GET',
        path: '/emp/{id}',
        handler: empController.getEmpById,
      }
    ]);
  });

  test('GET /emp - returns all emps', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/emp',
    });

    expect(res.statusCode).toBe(200);
    console.log(res.payload);
    const payload = JSON.parse(res.payload);
    expect(Array.isArray(payload)).toBe(true);
    expect(payload[0].dept_id.dept_name).toBe('IT');
  });

  test('POST /emp - creates a user', async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/emp',
      payload: {
        dept_id: 1, name: 'Ravi',   email:'r@r.com'
      },
    });

    expect(res.statusCode).toBe(200);
    const payload = JSON.parse(res.payload);
    expect(payload.emp_name).toBe('Ravi');
  });

  test('PUT /emp - updates a user', async () => {
    const res = await server.inject({
      method: 'PUT',
      url: '/emp',
      payload: {
        id:1,
        dept_id: 1, emp_name: 'Ravi-UP',   email:'r@r.com',
      }
    });

    expect(res.statusCode).toBe(200);
    const payload = JSON.parse(res.payload);
    expect(payload.message).toBe('Emp Record Update Successful');
  });


    test('GET by id - returns a user', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/emp/1',
    });

    expect(res.statusCode).toBe(200);
    //console.log(res);
    const payload = JSON.parse(res.payload);
    console.log(payload);
    expect(payload.id).toBe("1");
    expect(payload.emp_name).toBe("Ravi");
    // expect(payload[0].name).toBe('John Doe');
  });

  //Delete
    test('DELETE /emp - deletes a department', async () => {
    const res = await server.inject({
      method: 'DELETE',
      url: '/emp/1',
    });
    //console.log(res);
    expect(res.statusCode).toBe(200);

    const payload = JSON.parse(res.payload);
    expect(payload.message).toBe('Deleted Successfully');
  });

});