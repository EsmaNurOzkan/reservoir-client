import React, { useState } from 'react';
import '../styles/Cube.css';
import '../styles/App.css';
import { Modal } from 'react-bootstrap';
import NoteCard from './NoteCard';
import AddNote from '../notes/AddNote';

const Cube = ({ userId, token }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [closing, setClosing] = useState(false);

  const handleCubeClick = () => {
    setShowButtons(true);
  };

  const handleShowModal = (contentType) => {
    setSelectedContent(contentType);
    setShowModal(true);
    setClosing(false);
  };

  const handleNoteSuccess = () => {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
    }, 1000); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="scene" onClick={handleCubeClick}>
      <div className="cube">
        <div className="front"></div>
        <div className="back"></div>
        <div className="left"></div>
        <div className="right"></div>
        <div className="top"></div>
        <div className="bottom"></div>
      </div>

      {showButtons && (
        <div className="button-container">
          <button className="animated-button button1" onClick={() => handleShowModal('note')}>Not ekle</button>
          <button className="animated-button button2" onClick={() => handleShowModal('randomNote')}>Rastgele not seç</button>
        </div>
      )}

      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        centered 
        dialogClassName={`modal-grow-animation ${showModal && !closing ? 'show' : ''} ${closing ? 'modal-shrink-animation' : ''}`}
        className="simple_modal"

        >
        
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body >
          {selectedContent === 'note' && <AddNote userId={userId} token={token} onSuccess={handleNoteSuccess} />}
          {selectedContent === 'randomNote' && <NoteCard userId={userId} token={token} />}

        </Modal.Body>

      </Modal>
    </div>
  );
};

export default Cube; 
