import axios from "axios";
import { useFormik } from "formik";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";

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
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <form className="feed__form" onSubmit={handleSubmit}>
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
    </form>
  );
};

export default TextArea;
