// External dependencies

import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

// Internal dependencies

import InputField from "../../components/inputField/InputField";
import registerSchema from "../../validation/registerValidation";
import useToastCreator from "../../hooks/useToastCreator";
import { useRegisterUserMutation } from "../../features/apiSlice/authApiSlice/authApiSlice";
import Spinner from "../../utilities/spinner/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading: isUpdating, isError, error }] =
    useRegisterUserMutation();

  if (isError) useToastCreator(error as string, "error");

  const { handleChange, handleBlur, errors, touched, values, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        await registerUser(values);
        if (!isUpdating && !isError) {
          navigate("/");
          useToastCreator("Registered successful, you can login", "success");
        }
      },
    });

  let content;

  if (isUpdating) {
    content = <Spinner size={125} />;
  } else {
    content = (
      <div className="register__container">
        <Link to="/" className="register__home-page-button">
          Back to home page
        </Link>
        <h2 className="register__title">SignIn</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <InputField
            type="firstName"
            label="First Name"
            name="firstName"
            className="register"
            touched={touched.firstName}
            error={errors.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
          />
          <InputField
            type="lastName"
            label="Last Name"
            name="lastName"
            className="register"
            touched={touched.lastName}
            error={errors.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
          />
          <InputField
            type="username"
            label="Username"
            name="username"
            className="register"
            touched={touched.username}
            error={errors.username}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
          <InputField
            type="email"
            label="Email"
            name="email"
            className="register"
            touched={touched.email}
            error={errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <InputField
            type="password"
            label="Password"
            name="password"
            className="register"
            touched={touched.password}
            error={errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <InputField
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            className="register"
            touched={touched.confirmPassword}
            error={errors.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
          />
          <button
            type="submit"
            className="register__button"
            disabled={isUpdating}
          >
            SignIn
          </button>
        </form>
      </div>
    );
  }

  return <section className="register">{content}</section>;
};

export default Register;
