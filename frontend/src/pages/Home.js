import { useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Dashboard from '../components/Dashboard';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Personal Expense Tracker</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
      
      <ExpenseForm onAdd={() => window.location.reload()} />
      <ExpenseList />
      <Dashboard />
    </div>
  );
};

export default Home;
