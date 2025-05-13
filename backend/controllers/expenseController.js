const Expense = require('../models/Expense');
const { Op, fn, col } = require('sequelize');

const createExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;
  try {
    const expense = await Expense.create({
      amount,
      category,
      date,
      description,
      UserId: req.user.id,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getExpenses = async (req, res) => {
  const { category, startDate, endDate } = req.query;
  try {
    const where = { UserId: req.user.id };
    if (category) where.category = category;
    if (startDate && endDate) {
      where.date = { [Op.between]: [startDate, endDate] };
    }

    const expenses = await Expense.findAll({ where });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;
  try {
    const expense = await Expense.findOne({ where: { id: req.params.id, UserId: req.user.id } });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;
    expense.description = description || expense.description;
    await expense.save();

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ where: { id: req.params.id, UserId: req.user.id } });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.destroy();
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMonthlyReport = async (req, res) => {
  const { year, month } = req.query;
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const expenses = await Expense.findAll({
      where: {
        UserId: req.user.id,
        date: { [Op.between]: [startDate, endDate] },
      },
      attributes: ['category', [fn('SUM', col('amount')), 'total']],
      group: ['category'],
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getMonthlyReport,
};