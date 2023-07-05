import React from "react";
import { IUser } from "../../pages/user-profile/types";

interface Props {
  request: IUser;
}

const FriendsRequest: React.FC<Props> = ({ request }) => {
  return <div>FriendsRequest</div>;
};

export default FriendsRequest;
