// External dependencies

import React from "react";

// Internal dependencies

import PostOwner from "../post/subcomponents/PostOwner";
import { IUserPartial } from "../../pages/user-profile/types";
import AcceptButton from "./subcomponents/AcceptButton";
import RejectButton from "./subcomponents/RejectButton";

interface Props {
  request: IUserPartial;
}

const FriendsRequest: React.FC<Props> = ({ request }) => {
  return (
    <li className="request">
      <PostOwner post_owner={request} />
      <div className="request__button-container">
        <AcceptButton request={request} />
        <RejectButton request={request} />
      </div>
    </li>
  );
};

export default FriendsRequest;
