import { useFormik } from "formik";
import { Link } from "react-router-dom";
import InputField from "../../components/inputField/InputField";
import loginSchema from "../../validation/loginValidation";

const Login = () => {
  const { handleChange, handleBlur, errors, touched, values, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__home-page-button">
          Back to home page
        </Link>
        <h2 className="login__title">LogIn</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <InputField
            type="username"
            label="Username"
            name="username"
            className="login"
            touched={touched.username}
            error={errors.username}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
          <InputField
            type="password"
            label="Password"
            name="password"
            className="login"
            touched={touched.password}
            error={errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <button type="submit" className="login__button">
            Login
          </button>
        </form>
        <div className="login__or-element">
          <div className="login__line" />
          <p className="login__or">Or</p>
        </div>
        <Link to="/register" className="login__sign-in-button">
          Sign in
        </Link>
      </div>
    </section>
  );
};

export default Login;
