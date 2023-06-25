import axios from "axios";
import { useFormik } from "formik";
import { useAppSelector } from "../../hooks/reduxHooks";
import useToastCreator from "../../hooks/useToastCreator";
import { RootState } from "../../redux/store";
import { GrAttachment } from "react-icons/gr";

interface Props {
  reRender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

const TextArea: React.FC<Props> = ({ reRender, setRerender }) => {
  const { username, userId } = useAppSelector((state: RootState) => state.auth);
  // TODO: refactor fetch to rtkQuery and formik hooks to formik components
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      postBody: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post(
          `http://localhost:5000/api/posts`,
          {
            postBody: values.postBody,
            username: username,
            userId: userId,
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
        />
      </div>
    </form>
  );
};

export default TextArea;
