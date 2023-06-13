import { useFormik } from "formik";
import { Link } from "react-router-dom";
import InputField from "../../components/inputField/InputField";

const Register = () => {
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__home-page-button">
          Back to home page
        </Link>
        <h2 className="register__title">SignIn</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <InputField
            type="username"
            label="Username"
            className="register"
            onChange={handleChange}
            value={values.username}
          />
          <InputField
            type="email"
            label="Email"
            className="register"
            onChange={handleChange}
            value={values.username}
          />
          <InputField
            type="password"
            label="Password"
            className="register"
            onChange={handleChange}
            value={values.username}
          />
          <button type="submit" className="register__button">
            SignIn
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
