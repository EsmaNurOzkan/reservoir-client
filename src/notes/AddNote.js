import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/AddNote.css";

const AddNote = ({ userId, token, onSuccess }) => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.classList.add("animate-in");
      }
    }, 10); 
    
    return () => clearTimeout(timeout);
  }, []);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}api/notes/${userId}/add`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Not başarıyla eklendi!");
      setContent("");

      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {
      console.error("Not eklenirken hata:", err);
      setError(err.response?.data?.message || "Bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="add-note-container">
      <h3>Yeni Not Ekle</h3>
      <form onSubmit={handleSubmit} className="add-note-form">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Notunuzu buraya yazın..."
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Kaydediliyor..." : "Kaydet"}
        </button>

        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner" />
            <p>Lütfen bekleyin...</p>
          </div>
        )}

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AddNote;
