// External dependencies

import React from "react";
import { Link, useParams } from "react-router-dom";
import { EntityId, EntityState } from "@reduxjs/toolkit";

//Internal dependencies

import { useGetUserByIdQuery } from "../../features/apiSlice/userApiSlice/userApiSlice";
import { IUserBasicData } from "../../pages/user-profile/types";

// Assets

import defaultImg from "../../assets/images/default_img.png";

interface Props {
  friendId: EntityId;
}
const Friend: React.FC<Props> = ({ friendId }) => {
  const { userId } = useParams();
  const { friend } = useGetUserByIdQuery(userId as string, {
    selectFromResult: ({ data }) => ({
      friend: (data?.friends as EntityState<IUserBasicData>)?.entities[
        friendId
      ],
    }),
  });

  const { profilePicture } = friend as IUserBasicData;

  return (
    <Link to={`/user/${friendId}`}>
      <img
        src={profilePicture ? profilePicture : defaultImg}
        alt="user profile"
        className="friend__img"
        width={50}
        height={50}
      />
    </Link>
  );
};

export default Friend;
