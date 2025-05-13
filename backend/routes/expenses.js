const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getMonthlyReport,
} = require('../controllers/expenseController');

router.use(authMiddleware);

router.post('/', createExpense);
router.get('/', getExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
router.get('/report', getMonthlyReport);

module.exports = router;