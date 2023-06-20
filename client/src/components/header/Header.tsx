import { Link } from "react-router-dom";
import { logOut } from "../../features/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import defaultImg from "../../assets/images/default_img.png";

const Header = () => {
  const dispatch = useAppDispatch();
  const { username, userId } = useAppSelector((state: RootState) => state.auth);

  const handleLogOut = async () => {
    try {
      await fetch(`http://localhost:5000/api/logout`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": `http://localhost:5000`,
          "Content-Type": "application/json",
        },
      });
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  };
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
                src={defaultImg}
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
              onClick={() => handleLogOut()}
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
