import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, title, className = '' }) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className={`modal-content ${className}`} onClick={e => e.stopPropagation()}>
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
