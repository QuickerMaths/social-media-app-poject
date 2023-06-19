import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/inputField/InputField";
import { getAuth } from "../../features/authSlice/authSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import loginSchema from "../../validation/loginValidation";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // TODO: refactor fetch to rtkQuery and formik hooks to formik components

  const { handleChange, handleBlur, errors, touched, values, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        try {
          await fetch(`${import.meta.env.BACKEND_URL}/auth`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              "Access-Control-Allow-Origin": `${import.meta.env.BACKEND_URL}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: values.username,
              password: values.password,
            }),
          });
          dispatch(getAuth(values.username));
          navigate("/");
        } catch (error) {
          console.log(error);
        }
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
