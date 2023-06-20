import React from "react";
import moment from "moment";

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
  return (
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
      <button className="user-details__edit-button">Edit</button>
    </section>
    //TODO: create modal with form to edit user details
  );
};

export default UserDetails;
