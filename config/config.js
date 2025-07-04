
// require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    host: 'localhost',
    //port: 1433,
    port: 5432,
    dialect: 'postgres' // or 'mysql', 'sqlite'
    //dialect: 'mssql' // or 'mysql', 'sqlite'
  }
};
