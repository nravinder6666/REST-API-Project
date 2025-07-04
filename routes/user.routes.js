module.exports = [
    {
      method: 'GET',
      path: '/users',
      handler: require('../controllers/user.controller').getAllUsers
    },
        {
      method: 'GET',
      path: '/users/{id}',
      handler: require('../controllers/user.controller').getUserById
    },
     {
      method: 'POST',
      path: '/users',
      handler: require('../controllers/user.controller').createUser
    },
    {
      method: 'PUT',
      path: '/users',
      handler: require('../controllers/user.controller').updateUser
    },
    {
      method: 'DELETE',
      path: '/users/{id}',
      handler: require('../controllers/user.controller').deleteUser
    }
    

  ];
  