import axios from "axios";
import React from "react";
import { closeModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import { useFormik } from "formik";
import { IRePost } from "../../../components/post/types";

interface Props {
  post: IRePost;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
  reRender: boolean;
}

const PostEditRePostForm: React.FC<Props> = ({
  post,
  setReRender,
  reRender,
}) => {
  const { _id: postId, postBody } = post;
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      postBody: postBody,
    },
    onSubmit: async (values) => {
      try {
        await axios.put("http://localhost:5000/api/repost/edit", {
          postId,
          userId,
          postBody: values.postBody,
        });

        dispatch(closeModal(`${postId}edit`));
        setReRender(!reRender);
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <form onSubmit={handleSubmit} className="post-edit-modal__form">
      <textarea
        rows={5}
        cols={10}
        name="postBody"
        id="postBody"
        value={values.postBody}
        onChange={handleChange}
        className="post-edit-modal__text-area"
      />
      <button className="post-edit-modal__button" type="submit">
        Edit
      </button>
    </form>
  );
};

export default PostEditRePostForm;
