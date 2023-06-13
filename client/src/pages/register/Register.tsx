import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__home-page-button">
          Back to home page
        </Link>
        <h2 className="register__title">SignIn</h2>
        <form className="register__form">
          <div className="register__form-element">
            <label htmlFor="username" className="register__label">
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              className="register__input"
            />
          </div>
          <div className="register__form-element">
            <label htmlFor="email" className="register__label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="register__input"
            />
          </div>
          <div className="register__form-element">
            <label htmlFor="password" className="register__label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="register__input"
            />
          </div>
          <button type="submit" className="register__button">
            SignIn
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
