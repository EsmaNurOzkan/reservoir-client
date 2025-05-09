import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHandHoldingHeart } from "react-icons/fa";
import "../styles/Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-wrapper">
      <Container className="text-center py-5">
        <FaHandHoldingHeart size={80} className="hand-icon mb-3" />
        <h2 className="welcome-title">Duygusal Kumbarana Hoş Geldin</h2>
        <p className="welcome-text">
        Mutlu olduğun, minnet duyduğun anları biriktir, 
        ihtiyacın olduğunda açıp tekrar hatırla. 
        </p>
        <div className="mt-4">
          <button className="custom-purple-button mx-2" onClick={() => navigate("/login")}>
            Giriş Yap
          </button>
          <button className="custom-purple-button mx-2" onClick={() => navigate("/register")}>
            Kayıt Ol
          </button>
        </div>
      </Container>
    </div>
  );
}

export default Welcome;
