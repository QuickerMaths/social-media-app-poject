import axios from "axios";
import moment from "moment";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { openModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import PostEditModal from "../../../portals/post-edit-modal/PostEditModal";
import { RootState } from "../../../redux/store";

interface Props {
  createdAt: string;
  postId: string;
  postImage: string;
  postBody: string;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
  reRender: boolean;
}

const PostEdit: React.FC<Props> = ({
  createdAt,
  postId,
  postImage,
  postBody,
  setReRender,
  reRender,
}) => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);

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
          onClick={() => handlePostDelete(userId as string, postId)}
        >
          <AiOutlineDelete className="post__edit-icon" />
        </button>
        <p className="post__createdAt">{moment(createdAt).fromNow()}</p>
      </div>
      <PostEditModal
        postId={postId}
        postImage={postImage}
        postBody={postBody}
        userId={userId as string}
        reRender={reRender}
        setReRender={setReRender}
      />
    </>
  );
};

export default PostEdit;
