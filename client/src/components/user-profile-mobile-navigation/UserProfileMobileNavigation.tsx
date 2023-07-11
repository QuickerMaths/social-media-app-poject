//External dependencies

import React from "react";

interface Props {
  setActivePage: React.Dispatch<React.SetStateAction<"posts" | "details">>;
  activePage: "posts" | "details";
}

const UserProfileMobileNavigation: React.FC<Props> = ({
  setActivePage,
  activePage,
}) => {
  return (
    <nav className="user-profile-mobile-navigation">
      <ul className="user-profile-mobile-navigation__list">
        <li className="user-profile-mobile-navigation__item">
          <button
            className={`user-profile-mobile-navigation__button ${
              activePage === "posts" && "button-active"
            }`}
            onClick={() => setActivePage("posts")}
          >
            Users posts
          </button>
        </li>
        <li className="user-profile-mobile-navigation__item">
          <button
            className={`user-profile-mobile-navigation__button ${
              activePage === "details" && "button-active"
            }`}
            onClick={() => setActivePage("details")}
          >
            Users details
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default UserProfileMobileNavigation;
