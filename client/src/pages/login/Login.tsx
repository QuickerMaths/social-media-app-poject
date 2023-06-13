import { Link } from "react-router-dom";
import InputField from "../../components/inputField/InputField";

const Login = () => {
  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__home-page-button">
          Back to home page
        </Link>
        <h2 className="login__title">LogIn</h2>
        <form className="login__form">
          <InputField type="username" label="Username" className="login" />
          <InputField type="password" label="Password" className="login" />

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
