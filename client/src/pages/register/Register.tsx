import { Link } from "react-router-dom";
import InputField from "../../components/inputField/InputField";

const Register = () => {
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__home-page-button">
          Back to home page
        </Link>
        <h2 className="register__title">SignIn</h2>
        <form className="register__form">
          <InputField type="username" label="Username" className="register" />
          <InputField type="email" label="Email" className="register" />
          <InputField type="password" label="Password" className="register" />
          <button type="submit" className="register__button">
            SignIn
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
