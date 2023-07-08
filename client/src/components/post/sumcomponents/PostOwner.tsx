import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../../../assets/images/default_img.png";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { IUserBasicData } from "../../../pages/user-profile/types";
import { RootState } from "../../../redux/store";

interface Props {
  owner: IUserBasicData;
}

const PostOwner: React.FC<Props> = ({ owner }) => {
  const { userId, userImg } = useAppSelector((state: RootState) => state.auth);

  return (
    <Link to={`/user/${owner._id}`} className="post__owner-wrapper">
      <img
        className="post__profile-img"
        //TODO: figure out how to display userImg even if its null (displaying after img its removal without need to reloading the page)
        src={
          userImg && userId === owner._id
            ? userImg
            : owner.profilePicture
            ? owner.profilePicture
            : defaultImg
        }
        width={50}
        height={50}
      />
      <h3 className="post__owner">{owner.username}</h3>
    </Link>
  );
};

export default PostOwner;
