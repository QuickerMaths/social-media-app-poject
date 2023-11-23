// External dependencies

import React from "react";

// Internal dependencies

import AcceptButton from "./subcomponents/AcceptButton";
import RejectButton from "./subcomponents/RejectButton";
import PostOwner from "../post/subcomponents/PostOwner";
import { IUserPartial } from "../../pages/user-profile/types";

interface Props {
  request: IUserPartial;
}

const FriendsRequest = React.forwardRef<HTMLLIElement, Props>(
  ({ request }, ref) => {
    return (
      <li className="request" ref={ref}>
        <PostOwner post_owner={request} />
        <div className="request__button-container">
          <AcceptButton request={request} />
          <RejectButton request={request} />
        </div>
      </li>
    );
  }
);

export default FriendsRequest;
