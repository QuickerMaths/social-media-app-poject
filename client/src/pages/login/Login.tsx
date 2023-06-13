import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__home-page-button">
          Back to home page
        </Link>
        <h2 className="login__title">LogIn</h2>
        <form className="login__form">
          <div className="login__form-element">
            <label htmlFor="username" className="login__label">
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              className="login__input"
            />
          </div>
          <div className="login__form-element">
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="login__input"
            />
          </div>
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
