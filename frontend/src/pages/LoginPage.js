import { Link } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <Login />
      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
