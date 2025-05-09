import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h2 style= {styles.not_found} > 404 </h2>
      <h1 style={styles.heading}>😢 Üzgünüz, böyle bir sayfa yok..</h1>
      <Link to="/" style={styles.link}>Anasayfaya Dön</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '80px 20px',
    fontFamily: 'sans-serif',
  },
  not_found: {
    color: "crimson"
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '16px',
  },
  text: {
    fontSize: '1.1rem',
    marginBottom: '24px',
    color: '#666',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#007BFF',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: 'bold',
  },
};

export default NotFound;
