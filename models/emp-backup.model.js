module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Emp', {
      emp_name: DataTypes.STRING,
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
//   dept_id: {
//     type: DataTypes.INTEGER,
// },
dept_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'dept',
        key: 'dept_id'
      }
    },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedat'
      }
    }, {
      tableName: 'emp', 
      timestamps: true
    });

  emp.associate = (models) => {
    emp.belongsTo(models.dept, {
      foreignKey: 'dept_id',
      as: 'dept'
    });
  };
  };