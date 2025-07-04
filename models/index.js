const { Sequelize } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.user = require('./user.model')(sequelize, Sequelize);
db.dept = require('./dept.model')(sequelize, Sequelize);
db.emp = require('./emp.model')(sequelize, Sequelize);
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
module.exports = db;
