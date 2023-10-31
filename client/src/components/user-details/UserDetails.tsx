// External dependencies

import React from "react";
import moment from "moment";

// Internal dependencies

import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import UserDetailsModal from "../../portals/user-details-modal/UserDetailsModal";
import { IUser } from "../../pages/user-profile/types";
import { openModal } from "../../features/modalSlice/modalSlice";

interface Props {
  user: IUser;
}

const UserDetails: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { created_at, street, city, state, postal_code, id: userId } = user;

  const { modals } = useAppSelector((state: RootState) => state.modal);
  const { userId: activeUserId } = useAppSelector(
    (state: RootState) => state.auth
  );

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
            Postal code: {!postal_code ? "N/A" : postal_code}
          </li>
          <li className="user-details__info-item">
            Socialy member since: {moment(created_at).format("MMMM Do YYYY")}
          </li>
        </ul>
        {activeUserId === userId && activeUserId && (
          <button
            className="user-details__edit-button"
            onClick={() => dispatch(openModal("userDetailsModal"))}
          >
            Edit
          </button>
        )}
      </section>
      {modals["userDetailsModal"] && <UserDetailsModal />}
    </>
  );
};

export default UserDetails;
