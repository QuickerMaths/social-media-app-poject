// External dependencies

import React from "react";
import { Link } from "react-router-dom";

//Internal dependencies

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { closeModal } from "../../features/modalSlice/modalSlice";

// Assets

import defaultImg from "../../assets/images/default_img.png";
import { IUserPartial } from "../../pages/user-profile/types";

interface Props {
  friend: IUserPartial;
}
const Friend: React.FC<Props> = ({ friend }) => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);

  const { id, avatar_url } = friend;

  return (
    <Link to={`/user/${id}`}>
      <img
        src={avatar_url || defaultImg}
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
