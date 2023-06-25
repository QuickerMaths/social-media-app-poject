import axios from "axios";
import { GrAttachment } from "react-icons/gr";
import { useFormik } from "formik";
import { useConvertToBase64 } from "../../hooks/useConvertToBase64";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import useToastCreator from "../../hooks/useToastCreator";

interface Props {
  reRender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

const TextArea: React.FC<Props> = ({ reRender, setRerender }) => {
  const { username, userId } = useAppSelector((state: RootState) => state.auth);
  // TODO: refactor fetch to rtkQuery and formik hooks to formik components
  const { handleChange, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      postBody: "",
      image: null,
    },
    onSubmit: async (values) => {
      try {
        await axios.post(
          `http://localhost:5000/api/posts`,
          {
            postBody: values.postBody,
            username: username,
            userId: userId,
            postImage: values.image
              ? await useConvertToBase64(values.image)
              : null,
          },
          {
            withCredentials: true,
          }
        );
        setRerender(!reRender);
        values.postBody = "";
      } catch (err: any) {
        if (err.response.status === 403) {
          useToastCreator("You must be logged in to post", "error");
        }
        console.log(err);
      }
    },
  });

  return (
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
  );
};

export default TextArea;
