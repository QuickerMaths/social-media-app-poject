import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import defaultImg from "../../assets/images/default_img.png";
import { useLogoutUserMutation } from "../../features/apiSlice/authApiSlice/authApiSlice";
import useToastCreator from "../../hooks/useToastCreator";
import Spinner from "../../utilities/spinner/Spinner";

const Header = () => {
  const { username, userId, userImg } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [logoutUser, { isLoading: isLoggingOut, isError, error }] =
    useLogoutUserMutation();

  if (isError) useToastCreator(error as string, "error");

  let content;

  if (isLoggingOut) {
    content = <Spinner size={50} />;
  } else {
    content = (
      <button
        className="header__login-button"
        onClick={() => logoutUser("")}
        disabled={isLoggingOut}
      >
        LogOut
      </button>
    );
  }

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
              {content}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
