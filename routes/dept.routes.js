module.exports = [
    {
      method: 'GET',
      path: '/dept',
      handler: require('../controllers/dept.controller').getAllDepts
    },
    {
      method: 'GET',
      path: '/dept/{id}',
      handler: require('../controllers/dept.controller').getDeptById
    },
    {
      method: 'POST',
      path: '/dept',
      handler: require('../controllers/dept.controller').createDept
    },
    {
      method: 'PUT',
      path: '/dept',
      handler: require('../controllers/dept.controller').updateDept
    },
    {
      method: 'DELETE',
      path: '/dept/{id}',
      handler: require('../controllers/dept.controller').deleteDept
    }

  ];
  