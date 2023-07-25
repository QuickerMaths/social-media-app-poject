import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import defaultImg from "../../assets/images/default_img.png";
import { useLogoutUserMutation } from "../../features/apiSlice/authApiSlice/authApiSlice";

const Header = () => {
  const { username, userId, userImg } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [logoutUser] = useLogoutUserMutation();

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <h1 className="header__logo">Socialy</h1>
        </Link>
        {!username ? (
          <Link to="/login">
            <button className="header__login-button">LogIn</button>
          </Link>
        ) : (
          <div className="header__user-logged">
            <Link to={`/user/${userId}`} className="header__user-link">
              <img
                src={userImg ? userImg : defaultImg}
                alt="profile picture"
                width={50}
                height={50}
                className="header__user-img"
              />
              <button className="header__user-profile">
                Welcome, {username}
              </button>
            </Link>
            <button
              className="header__login-button"
              onClick={() => logoutUser("")}
            >
              LogOut
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
