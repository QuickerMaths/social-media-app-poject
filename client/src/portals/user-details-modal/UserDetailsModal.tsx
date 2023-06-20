import React from "react";
import ReactDOM from "react-dom";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDetailsModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="user-details-modal">
      <div className="user-details-modal__overlay"></div>
      <div className="user-details-modal__content">
        <button onClick={() => setIsOpen(false)}>X</button>
        <h2>Modal</h2>
      </div>
    </div>,
    document.body
  );
};

export default UserDetailsModal;
