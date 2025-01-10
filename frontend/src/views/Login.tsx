import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/form.css';

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setStatusMsg('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      onLogin(data.token);
      navigate('/');
    } catch (err: any) {
      setStatusMsg(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-button"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-button"
          />
        </div>
        <div className="message-aut-container">
          <div className={`message-aut ${statusMsg === 'Registration successful' ? 'success' : 'error'}`}>
            {statusMsg && <div>{statusMsg}</div>}
          </div>
        </div>
        <button type="submit" className="input-button">Login</button>
        <div className="container-lost-register">
          <div>
            <Link to="/" className="input-button">
              Lost Account
            </Link>
          </div>
          <div>
            <Link to="/register" className="input-button">
              Create Account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
