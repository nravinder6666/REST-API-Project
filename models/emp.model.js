module.exports = (sequelize, DataTypes) => {
  const Emp = sequelize.define('Emp', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    dept_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'dept',
        key: 'dept_id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdat',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedat',
    }
  }, {
    tableName: 'emp',
    timestamps: true,
  });

  // Define associations here
  Emp.associate = (models) => {
    Emp.belongsTo(models.dept, {
      foreignKey: 'dept_id',
      as: 'dept',
    });
  };

  return Emp;
};