import { useFormik } from "formik";
import { Link } from "react-router-dom";
import InputField from "../../components/inputField/InputField";
import registerSchema from "../../validation/registerValidation";

const Register = () => {
  const { handleChange, handleBlur, errors, touched, values, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
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
