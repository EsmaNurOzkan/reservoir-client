
import React from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { FiLogOut } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom";
import Cube from "../components/Cube.js";
import "../styles/Home.css";

function Home() {
  const { logout, user, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <div className="home-wrapper">
      <div className="logout-icon" onClick={handleLogout}>
        <FiLogOut size={32} title="Çıkış Yap" />
      </div>
      <Container className="text-center">
        {user && <p>Hoş geldin, <strong>{user.username}</strong>!</p>}
        <Cube userId={user.id} token={token}/>
        <h4 className="mt-3"> Küçük mutluluklar zamanla büyük bir hazineye dönüşür.. 😊</h4>

      </Container>
    </div>
  );
}

export default Home;
