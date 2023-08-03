// External dependencies

import React from "react";
import { Link } from "react-router-dom";

// Internal dependencies
import { useAppSelector } from "../../../hooks/reduxHooks";
import { IUserBasicData } from "../../../pages/user-profile/types";
import { RootState } from "../../../redux/store";

// Assets
import defaultImg from "../../../assets/images/default_img.png";

interface Props {
  owner: IUserBasicData;
}

const PostOwner: React.FC<Props> = ({
  owner: { _id, profilePicture, username },
}) => {
  const { userId, userImg } = useAppSelector((state: RootState) => state.auth);

  return (
    <Link to={`/user/${_id}`} className="post__owner-wrapper">
      <img
        className="post__profile-img"
        //TODO: figure out how to display userImg even if its null (displaying after img its removal without need to reloading the page)
        src={
          userImg && userId === _id
            ? userImg
            : profilePicture
            ? profilePicture
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
