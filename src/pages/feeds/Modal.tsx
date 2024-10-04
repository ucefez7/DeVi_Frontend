import React from "react";
import "./Modal.scss";

interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ setOpen, children }) => {
  return (
    <div className="modal">
      <div className="modalContent">
        <span className="close" onClick={() => setOpen(false)}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
