import React, { useState } from "react";
import moment from "moment";
import UserDetailsModal from "../../portals/user-details-modal/UserDetailsModal";

interface Props {
  createdAt: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

const UserDetails: React.FC<Props> = ({
  createdAt,
  address: { street, city, state, zip },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <section className="user-details">
        <h4 className="user-details__title">Details</h4>
        <ul className="user-details__info">
          <li className="user-details__info-item">
            Street: {!street ? "N/A" : street}
          </li>
          <li className="user-details__info-item">
            City: {!city ? "N/A" : city}
          </li>
          <li className="user-details__info-item">
            State: {!state ? "N/A" : state}
          </li>
          <li className="user-details__info-item">
            ZipCode: {!zip ? "N/A" : zip}
          </li>
          <li className="user-details__info-item">
            Socialy member since: {moment(createdAt).format("MMMM Do YYYY")}
          </li>
        </ul>
        <button
          className="user-details__edit-button"
          onClick={() => setIsOpen(true)}
        >
          Edit
        </button>
      </section>
      <UserDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
    //TODO: create modal with form to edit user details
  );
};

export default UserDetails;
