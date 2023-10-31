// External dependencies

import React from "react";
import { Link } from "react-router-dom";

// Internal dependencies
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";

// Assets
import defaultImg from "../../../assets/images/default_img.png";
import { closeModal } from "../../../features/modalSlice/modalSlice";
import { IPostOwner } from "../types";
interface Props {
  post_owner: IPostOwner;
}

const PostOwner: React.FC<Props> = ({
  post_owner: { id, username, avatar_url },
}) => {
  const dispatch = useAppDispatch();
  const { userId, userImg } = useAppSelector((state: RootState) => state.auth);
  const { modals } = useAppSelector((state: RootState) => state.modal);

  return (
    <Link
      to={`/user/${id}`}
      className="post__owner-wrapper"
      onClick={() => {
        if (modals["friends-request-list"]) {
          dispatch(closeModal("friends-request-list"));
          dispatch(closeModal("sidebar"));
        }
      }}
    >
      <img
        className="post__profile-img"
        //TODO: figure out how to display userImg even if its null (displaying after img its removal without need to reloading the page)
        src={
          userImg && userId === id
            ? userImg
            : avatar_url
            ? avatar_url
            : defaultImg
        }
        width={50}
        height={50}
      />
      <h3 className="post__owner">{username}</h3>
    </Link>
  );
};

export default PostOwner;
