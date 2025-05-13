import Register from '../components/Register';
import { Link } from 'react-router-dom';


const RegisterPage = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Register</h2>
      <Register />
      <p style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;