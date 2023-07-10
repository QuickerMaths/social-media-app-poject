import React, { useState } from "react";
import moment from "moment";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import UserDetailsModal from "../../portals/user-details-modal/UserDetailsModal";
import { IUser } from "../../pages/user-profile/types";
import { openModal } from "../../features/modalSlice/modalSlice";

interface Props {
  user: IUser;
  setRerenderAddress: React.Dispatch<React.SetStateAction<boolean>>;
  reRenderAddress: boolean;
}

const UserDetails: React.FC<Props> = ({
  user,
  reRenderAddress,
  setRerenderAddress,
}) => {
  const dispatch = useAppDispatch();
  const { createdAt, address, _id: userId } = user;

  const { userId: activeUserId } = useAppSelector(
    (state: RootState) => state.auth
  );

  return (
    <>
      <section className="user-details">
        <h4 className="user-details__title">Details</h4>
        <ul className="user-details__info">
          <li className="user-details__info-item">
            Street: {!address.street ? "N/A" : address.street}
          </li>
          <li className="user-details__info-item">
            City: {!address.city ? "N/A" : address.city}
          </li>
          <li className="user-details__info-item">
            State: {!address.state ? "N/A" : address.state}
          </li>
          <li className="user-details__info-item">
            ZipCode: {!address.zip ? "N/A" : address.zip}
          </li>
          <li className="user-details__info-item">
            Socialy member since: {moment(createdAt).format("MMMM Do YYYY")}
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
      <UserDetailsModal
        userId={userId}
        reRenderAddress={reRenderAddress}
        setRerenderAddress={setRerenderAddress}
      />
    </>
  );
};

export default UserDetails;
