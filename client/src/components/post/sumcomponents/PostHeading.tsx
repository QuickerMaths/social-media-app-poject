import moment from "moment";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import PostEditModal from "../../../portals/post-edit-modal/PostEditModal";
import defaultImg from "../../../assets/images/default_img.png";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import { openModal } from "../../../features/modalSlice/modalSlice";

interface Props {
  owner: {
    _id: string;
    username: string;
    profilePicture: string;
  };
  createdAt: string;
  postId: string;
  postImage: string;
  postBody: string;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
  reRender: boolean;
}

const PostHead: React.FC<Props> = ({
  owner,
  createdAt,
  postId,
  postImage,
  postBody,
  setReRender,
  reRender,
}) => {
  const dispatch = useAppDispatch();
  const { userId, userImg } = useAppSelector((state: RootState) => state.auth);
  const { modals } = useAppSelector((state: RootState) => state.modal);

  console.log(modals);

  const handlePostDelete = async (userId: string, postId: string) => {
    try {
      await axios.delete("http://localhost:5000/api/posts", {
        data: {
          userId,
          postId,
        },
      });

      setReRender(!reRender);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="post__top-container">
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
      {owner._id === userId ? (
        <>
          <div className="post__edit-wrapper">
            <button
              className="post__edit-button"
              onClick={() => dispatch(openModal("editPostModal"))}
            >
              <AiOutlineEdit className="post__edit-icon" />
            </button>
            <button
              className="post__edit-button"
              onClick={() => handlePostDelete(userId, postId)}
            >
              <AiOutlineDelete className="post__edit-icon" />
            </button>
            <p className="post__createdAt">{moment(createdAt).fromNow()}</p>
          </div>
          <PostEditModal
            postId={postId}
            postImage={postImage}
            postBody={postBody}
            userId={userId}
            reRender={reRender}
            setReRender={setReRender}
          />
        </>
      ) : (
        <p className="post__createdAt">{moment(createdAt).fromNow()}</p>
      )}
    </div>
  );
};

export default PostHead;
