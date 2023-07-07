import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";

const Sidebar = () => {
  const { userId, friendsRequests } = useAppSelector(
    (state: RootState) => state.auth
  );

  return (
    <section className="sidebar">
      <nav className="sidebar__navigation">
        <ul className="sidebar__navigation-list">
          <li className="sidebar__navigation-item">
            <Link to="/">
              <p className="sidebar__navigation-link">Home Page</p>
            </Link>
          </li>
          {userId ? (
            <>
              <li className="sidebar__navigation-item">
                <Link to={`/user/${userId}`}>
                  <p className="sidebar__navigation-link">Profile</p>
                </Link>
              </li>
              <li className="sidebar__navigation-item">
                <div className="sidebar__navigation-link">
                  Requests
                  {friendsRequests.length > 0 && (
                    <p className="sidebar__friends-requests-count">
                      {friendsRequests.length > 9
                        ? "9+"
                        : friendsRequests.length}
                    </p>
                  )}
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="sidebar__navigation-item">
                <Link to="/register">
                  <p className="sidebar__navigation-link">Register</p>
                </Link>
              </li>
              <li className="sidebar__navigation-item">
                <Link to="/login">
                  <p className="sidebar__navigation-link">Login</p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
