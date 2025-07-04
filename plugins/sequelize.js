const db = require('../models');

exports.plugin = {
  name: 'sequelize',
  version: '1.0.0',
  register: async function (server, options) {
    await db.sequelize.authenticate();
    console.log('Database connected!');
  }
};
