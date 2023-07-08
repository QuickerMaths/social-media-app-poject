import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { AiOutlineRight, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Sidebar = () => {
  const { userId, friendsRequests } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className="sidebar__toggle-button"
        onClick={() => setIsOpen(true)}
      >
        <AiOutlineRight className="sidebar__toggle-icon" />
      </button>
      <div
        className={`sidebar__overlay ${!isOpen && "is-hidden-overlay"}`}
        onClick={() => setIsOpen(false)}
      ></div>
      <section className={`sidebar ${!isOpen && "is-hidden-sidebar"}`}>
        <button
          className="sidebar__close-button"
          onClick={() => setIsOpen(false)}
        >
          <AiOutlineClose className="sidebar__close-icon" />
        </button>
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
    </>
  );
};

export default Sidebar;
