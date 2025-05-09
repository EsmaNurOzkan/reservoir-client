import React, { useEffect, useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import '../styles/NoteCard.css';

const NoteCard = ({ userId, token }) => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const containerRef = useRef(null);

  const fetchRandomNote = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/notes/${userId}/random`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setNote(response.data.note);
    } catch (err) {
      setError('Not alınamadı.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomNote();

    const timeout = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.classList.add("animate-in");
      }
    }, 10);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div ref={containerRef} className="note-card-container">
      <Card className="note-card">
        <Card.Body>
          <Card.Title className="text-center mb-3">🎲 Rastgele Not</Card.Title>

          {loading ? (
            <div className="loading-container">
              <Spinner animation="border" role="status" />
              <span className="loading-text">Getiriliyor... Lütfen bekleyin...</span>
            </div>
          ) : error ? (
            <Card.Text className="text-danger">{error}</Card.Text>
          ) : (
            <>
              <Card.Text className="note-content">{note?.content}</Card.Text>

              <div className="d-flex flex-column align-items-end mt-3">
              <small className="note-date mb-4">
              {new Date(note?.createdAt).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </small>

            <Button size="sm" variant="primary" onClick={fetchRandomNote} disabled={loading}>
              Yeni Not Getir
            </Button>
          </div>

            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default NoteCard;
