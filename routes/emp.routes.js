module.exports = [
    {
      method: 'GET',
      path: '/emp',
      handler: require('../controllers/emp.controller').getAllEmps
    },
    {
      method: 'GET',
      path: '/emp/{id}',
      handler: require('../controllers/emp.controller').getEmpById
    },
    {
      method: 'POST',
      path: '/emp',
      handler: require('../controllers/emp.controller').createEmp
    },
    {
      method: 'PUT',
      path: '/emp',
      handler: require('../controllers/emp.controller').updateEmp
    },
    {
      method: 'DELETE',
      path: '/emp/{id}',
      handler: require('../controllers/emp.controller').deleteEmp
    }
  ];
  