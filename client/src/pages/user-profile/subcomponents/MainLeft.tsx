import React from "react";
import { IUserAddress } from "../../../components/user-details/types";
import UserDetails from "../../../components/user-details/UserDetails";
import UserFriends from "../../../components/user-friends/UserFriends";

interface Props {
  createdAt: string;
  address: IUserAddress;
  userId: string;
  reRenderAddress: boolean;
  setRerenderAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainLeft: React.FC<Props> = ({
  createdAt,
  address,
  userId,
  reRenderAddress,
  setRerenderAddress,
}) => {
  return (
    <div className="user-profile__main-left">
      <UserDetails
        createdAt={createdAt}
        address={address}
        userId={userId as string}
        reRenderAddress={reRenderAddress}
        setRerenderAddress={setRerenderAddress}
      />
      <UserFriends />
    </div>
  );
};

export default MainLeft;
