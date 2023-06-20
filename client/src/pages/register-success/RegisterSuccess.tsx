import { Link } from "react-router-dom";

const RegisterSuccess = () => {
  return (
    <section className="register-success">
      <div className="register-success__container">
        <h2 className="register-success__title">
          You have successfully registered!
        </h2>
        <Link to="/login" className="register-success__link">
          <p className="register-success__navigate">
            Navigate to the login page
          </p>
        </Link>
      </div>
    </section>
  );
};

export default RegisterSuccess;
