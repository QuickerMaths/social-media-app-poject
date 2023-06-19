import { Link } from "react-router-dom";
import { logOut } from "../../features/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";

const Header = () => {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state: RootState) => state.auth);

  const handleLogOut = async () => {
    try {
      await fetch(`${import.meta.env.BACKEND_URL}/logout`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": `${import.meta.env.BACKEND_URL}`,
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
          <button
            className="header__login-button"
            onClick={() => handleLogOut()}
          >
            LogOut
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
