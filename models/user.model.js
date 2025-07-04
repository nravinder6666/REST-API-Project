module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdat'
      },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedat'
      }
    }, {
      tableName: 'users', // ensure correct table name
      timestamps: true
    });
  };