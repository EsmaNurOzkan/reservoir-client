import React, { useState } from 'react';
import { Form, Button, Modal, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import '../styles/Register.css'; 

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const { handleSendCode, handleRegister, loading, message, error, codeSent, handleVerifyCode, setError } = useAuth(); // AuthContext'ten fonksiyonlar alındı
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert('Şifreniz en az 8 karakter olmalıdır.');
      return;
    }

    if (!codeSent) {
      await handleSendCode(email);
      setShowModal(true);
      return;
    }

    if (!verificationCode) {
      setError('Lütfen doğrulama kodunu girin.');
      return;
    }

    await handleRegister(username, email, password, verificationCode); 
    if (message) {
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  const handleVerifyCodeSubmit = async () => {
    if (verificationCode.trim() === '') {
      setError('Lütfen doğrulama kodunu girin.');
      return;
    }

    await handleVerifyCode(verificationCode);
    setShowModal(false); 
  };

  return (
    <div className="register-container">
      <Form onSubmit={handleSubmit} className="register-form">
        <h2 className="text-center mb-4">Kayıt Ol</h2>
        <Row>
          <Col xs={12} md={10} xl={10} className="mx-auto">
            <Form.Group controlId="username">
              <Form.Label>Kullanıcı Adı</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-control-custom"
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>E-posta</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control-custom"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control-custom"
              />
            </Form.Group>

            <div style={{ textAlign: 'center' }} >
            <Button type="submit" className="btn-submit w-80">
              {loading ? <Spinner animation="border" size="sm" /> : 'Kayıt Ol'}
            </Button>
            </div>
            
            {message && <p className="text-success mt-3">{message}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}
          </Col>
        </Row>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Doğrulama Kodu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="verificationCode">
            <Form.Label>Doğrulama Kodu</Form.Label>
            <Form.Control
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              className="form-control-custom"
            />
          </Form.Group>
          {loading && (
            <div className="text-center mt-3">
              <Spinner animation="border" />
              <p className="mt-2">Kod gönderiliyor...</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleVerifyCodeSubmit}>
            Kodu Doğrula
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Register;
