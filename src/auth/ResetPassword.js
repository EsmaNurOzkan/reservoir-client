import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendResetLink = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/auth/sendresetlink`,
        { email }
      );
      setMessage(res.data.message);
      setError("");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Error");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/auth/verifycode`,
        { email, resetCode: code }
      );
      setMessage(res.data.message);
      setError("");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Error");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/auth/resetpassword`,
        {
          email,
          resetCode: code,
          newPassword,
        }
      );
      setMessage(res.data.message);
      setError("");
      setStep(1);
      setEmail("");
      setCode("");
      setNewPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <h2>Şifre Sıfırlama</h2>

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Lütfen bekleyin...</p>
        </div>
      )}

      {!loading && step === 1 && (
        <div className="form-group">
          <input
            type="email"
            placeholder="Email adresinizi girin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendResetLink}>Kod Gönder</button>
        </div>
      )}

      {!loading && step === 2 && (
        <div className="form-group">
          <input
            type="text"
            placeholder="E-posta adresinize gelen kodu girin"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={verifyCode}>Kodu Doğrula</button>
        </div>
      )}

      {!loading && step === 3 && (
        <div className="form-group">
          <input
            type="password"
            placeholder="Yeni şifrenizi girin"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={resetPassword}>Şifreyi Sıfırla</button>
        </div>
      )}

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ResetPassword;
