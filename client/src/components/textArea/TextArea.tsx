import axios from "axios";
import { useFormik } from "formik";

const TextArea = () => {
  // TODO: refactor fetch to rtkQuery and formik hooks to formik components
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      postBody: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`http://localhost:5000/posts`, {
          postBody: values.postBody,
          username: "Juby23",
          userId: "6489a3a42e13d432e3b5f447",
        });
        console.log(res);
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
