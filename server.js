require('dotenv').config();
const Hapi = require('@hapi/hapi');
const userRoutes = require('./routes/user.routes');
const deptRoutes = require('./routes/dept.routes');
const sequelizePlugin = require('./plugins/sequelize');
const empRoutes = require('./routes/emp.routes');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  await server.register(sequelizePlugin);
  server.route([...userRoutes, ...deptRoutes, ...empRoutes]);
  //server.route(deptRoutes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
