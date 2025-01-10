import { useState } from 'react';
import '../styles/form.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const validateEmailFormat = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(email);
  };

  const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];

  const validateEmailDomain = (email: string) => {
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setStatusMsg('Please fill out all fields');
      return;
    }

    if (!validateEmailFormat(email)) {
      setStatusMsg('Invalid email format');
      return;
    }

    if (!validateEmailDomain(email)) {
      setStatusMsg('Invalid domain');
      return;
    }

    if (password !== confirmPassword) {
      setStatusMsg("Passwords do not match");
      setPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      if (response.status === 409) {
        setStatusMsg('Email is already in use');
        return;
      }

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      setStatusMsg('Registration successful');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setStatusMsg(err.message);
    }
  };

  return (
    <div className="register-container">
      <h1>Create Account</h1>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-button"
          />
        </div>
        <div className="message-aut-container">
          <div className={`message-aut ${statusMsg === 'Registration successful' ? 'success' : 'error'}`}>
            {statusMsg && <div>{statusMsg}</div>}
          </div>
        </div>
        <button type="submit" className="input-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
