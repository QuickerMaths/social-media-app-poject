// External dependencies

import { Link } from "react-router-dom";
import { AiOutlineRight, AiOutlineClose } from "react-icons/ai";

// Internal dependencies

import FriendsRequestList from "../friends-request-list/FriendsRequestList";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { closeModal, openModal } from "../../features/modalSlice/modalSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const { userId, friendsRequests } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { modals } = useAppSelector((state: RootState) => state.modal);

  return (
    <>
      <button
        className="sidebar__toggle-button"
        onClick={() => dispatch(openModal("sidebar"))}
      >
        <AiOutlineRight className="sidebar__toggle-icon" />
      </button>
      <div
        className={`sidebar__overlay ${
          !modals["sidebar"] && "is-hidden-overlay"
        }`}
        onClick={() => dispatch(closeModal("sidebar"))}
      ></div>
      <section
        className={`sidebar ${!modals["sidebar"] && "is-hidden-sidebar"}`}
      >
        <button
          className="sidebar__close-button"
          onClick={() => dispatch(closeModal("sidebar"))}
        >
          <AiOutlineClose className="sidebar__close-icon" />
        </button>
        <nav className="sidebar__navigation">
          <ul className="sidebar__navigation-list">
            <li className="sidebar__navigation-item">
              <Link to="/" onClick={() => dispatch(closeModal("sidebar"))}>
                <p className="sidebar__navigation-link">Home Page</p>
              </Link>
            </li>
            {userId ? (
              <>
                <li className="sidebar__navigation-item">
                  <Link
                    to={`/user/${userId}`}
                    onClick={() => dispatch(closeModal("sidebar"))}
                  >
                    <p className="sidebar__navigation-link">Profile</p>
                  </Link>
                </li>
                <li className="sidebar__navigation-item">
                  <Link
                    to="/users"
                    onClick={() => dispatch(closeModal("sidebar"))}
                  >
                    <p className="sidebar__navigation-link">Users</p>
                  </Link>
                </li>
                <li className="sidebar__navigation-item">
                  <div
                    className="sidebar__navigation-link"
                    onClick={() => dispatch(openModal("friends-request-list"))}
                  >
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
      {modals["friends-request-list"] && <FriendsRequestList />}
    </>
  );
};

export default Sidebar;
