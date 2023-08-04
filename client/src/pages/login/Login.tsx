// External dependencies

import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

// Internal dependencies

import InputField from "../../components/inputField/InputField";
import useToastCreator from "../../hooks/useToastCreator";
import loginSchema from "../../validation/loginValidation";
import { useLoginUserMutation } from "../../features/apiSlice/authApiSlice/authApiSlice";
import Spinner from "../../utilities/spinner/Spinner";

const Login = () => {
  const navigate = useNavigate();

  const [loginUser, { isLoading: isLoginIn, isError, error, isSuccess }] =
    useLoginUserMutation();

  if (isError) useToastCreator(error as string, "error");

  const { handleChange, handleBlur, errors, touched, values, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        await loginUser({
          username: values.username,
          password: values.password,
        });
        if (isSuccess) {
          useToastCreator("You have been logged in successfully", "success");
          navigate("/");
        }
      },
    });

  let content;

  if (isLoginIn) {
    content = <Spinner size={125} />;
  } else {
    content = (
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
          <button type="submit" className="login__button" disabled={isLoginIn}>
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
    );
  }

  return <section className="login">{content}</section>;
};

export default Login;
