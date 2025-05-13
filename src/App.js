import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import "./styles/App.css";
import Home from './home/Home';
import Login from './auth/Login';
import NotFound from './error/NotFound';
import ResetPassword from './auth/ResetPassword';
import Register from './auth/Register';
import Welcome from './home/Welcome'; 

const AppRoutes = () => {
  const { token, sessionExpired } = useAuth();

  return (
    <div>
      {sessionExpired && (
        <div className="session-expired-message">
          Oturum süreniz doldu. Lütfen tekrar giriş yapın.
        </div>
      )}
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Welcome />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={!token ? <Login /> : <Navigate to="/home" />} /> */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/home" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
