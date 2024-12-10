import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import TaskManager from './TaskManager';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Register />
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <TaskManager onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
