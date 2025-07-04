module.exports = (sequelize, DataTypes) => {
  const Dept = sequelize.define('Dept', {
    dept_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdat',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedat',
    }
  }, {
    tableName: 'dept',
    timestamps: true
  });

  Dept.associate = (models) => {
    Dept.hasMany(models.emp, {  // ✅ must match `db.emp` key from index.js
      foreignKey: 'dept_id',
      as: 'employees'
    });
  };

  return Dept;
};
