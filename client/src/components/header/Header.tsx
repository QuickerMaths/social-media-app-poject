import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <h1 className="header__logo">Socialy</h1>
        </Link>
        <Link to="/login">
          <button className="header__login-button">LogIn</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
