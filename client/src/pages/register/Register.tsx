import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/inputField/InputField";
import registerSchema from "../../validation/registerValidation";

const Register = () => {
  const navigate = useNavigate();
  // TODO: refactor fetch to rtkQuery and formik hooks to formik components

  const { handleChange, handleBlur, errors, touched, values, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        try {
          await fetch(`http://localhost:5000/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: values.username,
              email: values.email,
              password: values.password,
            }),
          });

          navigate("/register-success");
        } catch (err: any) {
          //TODO: refactor error handling to make it work
          if (err.status === 400) console.log(err.response.data);
        }
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
          <button type="submit" className="register__button">
            SignIn
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
