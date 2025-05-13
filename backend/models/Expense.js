const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Expense = sequelize.define('Expense', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  indexes: [
    {
      name: 'idx_category_date',
      fields: ['category', 'date'],
    }
  ]
});

// Setup associations
User.hasMany(Expense);
Expense.belongsTo(User);

module.exports = Expense;
