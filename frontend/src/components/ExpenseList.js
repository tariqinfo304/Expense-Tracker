import { useState, useEffect } from 'react';
import api from '../axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editingId, setEditingId] = useState(null); 
  const [editForm, setEditForm] = useState({
    amount: '',
    category: '',
    date: '',
    description: '',
  });

  useEffect(() => {
    fetchExpenses();
  }, [category, startDate, endDate]);

  const fetchExpenses = async () => {
    try {
      const res = await api.get('/expenses', { params: { category, startDate, endDate } });
      setExpenses(res.data);
    } catch (error) {
      console.error('Error fetching expenses:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        alert('Please log in to view expenses');
        window.location.href = '/login';
      } else {
        // alert('Error fetching expenses');
        console.error('Error fetching expenses:', error.response?.data || error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error.response?.data || error.message);
      // alert('Error deleting expense');
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      amount: expense.amount,
      category: expense.category,
      date: new Date(expense.date).toISOString().split('T')[0], 
      description: expense.description || '',
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/expenses/${editingId}`, editForm);
      setExpenses(
        expenses.map((expense) =>
          expense.id === editingId ? { ...expense, ...res.data } : expense
        )
      );
      setEditingId(null); 
      setEditForm({ amount: '', category: '', date: '', description: '' }); 
    } catch (error) {
      console.error('Error updating expense:', error.response?.data || error.message);
      // alert('Error updating expense');
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({ amount: '', category: '', date: '', description: '' }); 
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {editingId === expense.id ? (
              <form onSubmit={handleEditSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                  placeholder="Amount"
                  required
                />
                <input
                  type="text"
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  placeholder="Category"
                  required
                />
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  required
                />
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Description"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={handleEditCancel}>Cancel</button>
              </form>
            ) : (
              <>
                {expense.amount} - {expense.category} - {expense.date} - {expense.description}
                <button onClick={() => handleEdit(expense)} style={{ marginLeft: '10px' }}>Edit</button>
                <button onClick={() => handleDelete(expense.id)} style={{ marginLeft: '10px' }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;