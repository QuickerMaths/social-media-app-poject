import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <nav className="sidebar__navigation">
        <ul className="sidebar__navigation-list">
          <li className="sidebar__navigation-item">
            <Link to="/">
              <p className="sidebar__navigation-link">Profile</p>
            </Link>
          </li>
          <li className="sidebar__navigation-item">
            <Link to="/">
              <p className="sidebar__navigation-link">Friends</p>
            </Link>
          </li>
          <li className="sidebar__navigation-item">
            <Link to="/">
              <p className="sidebar__navigation-link">HomePage</p>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
