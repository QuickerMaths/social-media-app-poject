import React from "react";
import ReactDOM from "react-dom";
import InputField from "../../components/inputField/InputField";
import { IUserAddress } from "../../components/user-details/types";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  address: IUserAddress;
}

const UserDetailsModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  userId,
  address,
}) => {
  if (!isOpen) return null;
  // const { street, city, state, zip } = address;
  console.log(userId);
  //TODO: swap X with icon
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
