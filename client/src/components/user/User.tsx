// External dependencies

import React from "react";
import { Link } from "react-router-dom";

// Internal dependencies

import { IUserPartial } from "../../pages/user-profile/types";

// Assets

import defaultImg from "../../assets/images/default_img.png";

interface Props {
  user: IUserPartial;
}

const User = React.forwardRef<HTMLLIElement, Props>(({ user }, ref) => {
  const { id, avatar_url, username } = user;
  return (
    <li className="user" ref={ref}>
      <Link to={`/user/${id}`} className="user__link">
        <img
          className="user__img"
          src={avatar_url || defaultImg}
          alt={username}
        />
        <p className="user__name">{username}</p>
      </Link>
    </li>
  );
});

export default User;
