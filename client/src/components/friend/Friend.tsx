// External dependencies

import React from "react";
import { Link, useParams } from "react-router-dom";
import { EntityId, EntityState } from "@reduxjs/toolkit";
import { skipToken } from "@reduxjs/toolkit/dist/query";

//Internal dependencies

import { useGetUserByIdQuery } from "../../features/apiSlice/userApiSlice/userApiSlice";
import { IUserBasicData } from "../../pages/user-profile/types";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { closeModal } from "../../features/modalSlice/modalSlice";

// Assets

import defaultImg from "../../assets/images/default_img.png";

interface Props {
  friendId: EntityId;
}
const Friend: React.FC<Props> = ({ friendId }) => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const { friend } = useGetUserByIdQuery(userId ?? skipToken, {
    selectFromResult: ({ data }) => ({
      friend: (data?.friends as EntityState<IUserBasicData>)?.entities[
        friendId
      ],
    }),
  });

  const { modals } = useAppSelector((state: RootState) => state.modal);

  const { profilePicture } = friend as IUserBasicData;

  return (
    <Link to={`/user/${friendId}`}>
      <img
        src={profilePicture ? profilePicture : defaultImg}
        alt="user profile"
        className="friend__img"
        width={50}
        height={50}
        onClick={() =>
          modals["userFriendsModal"] && dispatch(closeModal("userFriendsModal"))
        }
      />
    </Link>
  );
};

export default Friend;
