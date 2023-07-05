import React, { useState } from "react";
import moment from "moment";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks/reduxHooks";
import UserDetailsModal from "../../portals/user-details-modal/UserDetailsModal";
import { IUser } from "../../pages/user-profile/types";

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
  const {
    createdAt,
    address: { street, city, state, zip },
    _id: userId,
  } = user;

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
