import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [sessionExpired, setSessionExpired] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration'); 

    if (storedUser && storedToken && tokenExpiration) {
      const currentTime = Date.now();
      if (currentTime > tokenExpiration) {
        logout(); 
        setSessionExpired(true);
        setTimeout(() => {
          setSessionExpired(false); 
        }, 3000);
      } else {
        setUser(storedUser);
        setToken(storedToken);
      }
    }
  }, []);

  const handleSendCode = async (email) => {
    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/auth/send-code`, { email });
      setCodeSent(true);
      setMessage('Doğrulama kodu e-posta adresinize gönderildi.');
    } catch (error) {
      setError('Kod gönderilirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    if (!codeSent) {
      setError('Lütfen önce doğrulama kodunu alın.');
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/auth/register`, {
        username,
        email,
        password,
        code: verificationCode,
      });
      setMessage('Kayıt başarılı!');
      setUser({ username, email });
      localStorage.setItem('user', JSON.stringify({ username, email }));
    } catch (error) {
      setError('Kayıt sırasında bir hata oluştu.');
    }
  };

  const handleVerifyCode = (code) => {
    setVerificationCode(code);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });
      const { user, token, expiresIn } = response.data;

      const tokenExpiration = Date.now() + expiresIn * 1000;

      setUser(user);
      setToken(token); 

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token); 
      localStorage.setItem('tokenExpiration', tokenExpiration); 

      setMessage('Giriş başarılı!');
    } catch (error) {
      setError('Giriş sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null); 
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        message,
        error,
        codeSent,
        handleSendCode,
        handleRegister,
        handleVerifyCode,
        login,
        logout,
        sessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
