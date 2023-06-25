import React, { useState } from "react";
import moment from "moment";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks/reduxHooks";
import UserDetailsModal from "../../portals/user-details-modal/UserDetailsModal";
import { IUserAddress } from "./types";

interface Props {
  createdAt: string;
  address: IUserAddress;
  userId: string;
  setRerenderAddress: React.Dispatch<React.SetStateAction<boolean>>;
  reRenderAddress: boolean;
}

const UserDetails: React.FC<Props> = ({
  createdAt,
  address,
  userId,
  reRenderAddress,
  setRerenderAddress,
}) => {
  const { street, city, state, zip } = address;
  const { userId: activeUserId } = useAppSelector(
    (state: RootState) => state.auth
  );

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
        {activeUserId === userId && activeUserId && (
          <button
            className="user-details__edit-button"
            onClick={() => setIsOpen(true)}
          >
            Edit
          </button>
        )}
      </section>
      <UserDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userId={userId}
        reRenderAddress={reRenderAddress}
        setRerenderAddress={setRerenderAddress}
      />
    </>
  );
};

export default UserDetails;
