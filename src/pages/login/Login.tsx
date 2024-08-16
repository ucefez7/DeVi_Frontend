import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slice/authSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ClipLoader from 'react-spinners/ClipLoader';
import './AdminLogin.css';

interface Credentials {
  username: string;
  password: string;
}

function Login() {
  const dispatch = useDispatch<any>(); // Temporarily using 'any' for dispatch
  const navigate = useNavigate();
  const authState = useSelector((state: any) => state.auth);

  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    dispatch(login(credentials)).then(() => {
      setLoading(false);
      if (authState.isAuthenticated) {
        navigate('/');
      }
    });
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/');
    }
  }, [authState.isAuthenticated, navigate]);

  return (
    <div className="admin-login-wrapper">
      <Header />
      <div className="admin-login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Admin Login</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            disabled={loading}
          />
          <div className='err-div'>
            {authState.error && <p className="error-message" style={{color: 'red'}}>{authState.error}</p>}
          </div>
          <button type="submit" className='login-btn' disabled={loading}>
            {loading ? <ClipLoader color={"#ffffff"} size={20} /> : 'Login'}
          </button>
        </form>
      </div>
      <footer className="footer">
        © 2024 DeVi All Rights Reserved
      </footer>
    </div>
  );
}

export default Login;
