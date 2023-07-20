// External dependencies

import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import axios from "axios";

// Internal dependencies

import PostAction from "../../components/post/sumcomponents/PostAction";
import PostComments from "../../components/post/sumcomponents/PostComments";
import PostOwner from "../../components/post/sumcomponents/PostOwner";
import PostDetailsPost from "./subcomponents/PostDetailsPost";
import PostDetailsRePost from "./subcomponents/PostDetailsRePost";
import { IPost, IRePost } from "../../components/post/types";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { AiOutlineClose } from "react-icons/ai";
import { useFormik } from "formik";
import { closeModal } from "../../features/modalSlice/modalSlice";

interface Props {
  post: IPost | IRePost;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostDetailsModal: React.FC<Props> = ({ post, reRender, setReRender }) => {
  const {
    _id: postId,
    isRePost,
    createdAt,
    owner,
    comments,
    commentTotal,
  } = post;
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { modals } = useAppSelector((state: RootState) => state.modal);

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      commentBody: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:5000/api/comments", {
          commentBody: values.commentBody,
          postId,
          userId,
          isRePost,
        });
        values.commentBody = "";
        setReRender(!reRender);
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (!modals[`${postId}details`]) return null;

  return ReactDOM.createPortal(
    <div className="post-details-modal">
      <div
        className="post-details-modal__overlay"
        onClick={() => dispatch(closeModal(`${postId}details`))}
      ></div>
      <div className="post-details-modal__content">
        {!post ? (
          <p>Loading...</p>
        ) : (
          <>
            <button
              className="post-details-modal__close"
              onClick={() => dispatch(closeModal(`${postId}details`))}
            >
              <AiOutlineClose className="post-details-modal__close-icon" />
            </button>
            <div className="post-details-modal__top-container">
              <PostOwner owner={owner} />

              <p className="post-details-modal__createdAt">
                {moment(createdAt).fromNow()}
              </p>
            </div>
            <div className="post-details-modal__overflow">
              {isRePost ? (
                <PostDetailsRePost post={post as IRePost} />
              ) : (
                <PostDetailsPost post={post as IPost} />
              )}
              <PostAction post={post} />
              {commentTotal > 0 && (
                <PostComments
                  comments={comments}
                  reRender={reRender}
                  setReRender={setReRender}
                />
              )}
            </div>
            <form onSubmit={handleSubmit} className="post-details-modal__form">
              <input
                name="commentBody"
                id="commentBody"
                value={values.commentBody}
                onChange={handleChange}
                className="post-details-modal__text-area"
                placeholder="Write a comment..."
              />
              <button
                className="post-details-modal__submit-button"
                type="submit"
              >
                Comment
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default PostDetailsModal;
