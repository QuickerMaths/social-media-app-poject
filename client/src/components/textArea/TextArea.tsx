// External dependencies

import { GrAttachment } from "react-icons/gr";
import { useFormik } from "formik";

// Internal dependencies

import useToastCreator from "../../hooks/useToastCreator";
import { useConvertToBase64 } from "../../hooks/useConvertToBase64";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { useCreatePostMutation } from "../../features/apiSlice/postApiSlice/postApiSlice";

const TextArea = () => {
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [createPost, { isLoading: isUpdating, isError, error }] =
    useCreatePostMutation();

  const { handleChange, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      postBody: "",
      image: null,
    },
    onSubmit: async (values) => {
      createPost({
        postBody: values.postBody,
        _id: userId as string,
        postImage: values.image
          ? ((await useConvertToBase64(values.image)) as string)
          : undefined,
      });
    },
  });

  return (
    <>
      <form className="feed__form" onSubmit={handleSubmit}>
        <div className="feed__main">
          <textarea
            name="postBody"
            id="postBody"
            placeholder="Say something..."
            className="feed__textarea"
            onChange={handleChange}
            value={values.postBody}
          />
          <button type="submit" className="feed__button">
            Public
          </button>
        </div>
        <div className="feed__attachment">
          <GrAttachment className="feed__attachment-icon" />
          <input
            type="file"
            name="image"
            id="image"
            accept=".jpg, .png, .jpeg"
            className="feed__image-input"
            onChange={(e) => {
              setFieldValue("image", e.target.files![0]);
            }}
          />
        </div>
      </form>

      {isUpdating && <div>Updating...</div>}
      {isError && useToastCreator("error", JSON.stringify(error))}
    </>
  );
};

export default TextArea;
