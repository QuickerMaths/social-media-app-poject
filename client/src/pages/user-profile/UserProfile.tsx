// External dependencies

import { useState } from "react";
import { useParams } from "react-router";

// Internal dependencies

import useMediaQuery from "../../hooks/useMediaQuery";
import UserProfileMobileNavigation from "../../components/user-profile-mobile-navigation/UserProfileMobileNavigation";
import MainLeft from "./subcomponents/MainLeft";
import MainRight from "./subcomponents/MainRight";
import ProfileImage from "./subcomponents/ProfileImage";
import UserProfileImgModal from "../../portals/user-profile-img-modal/UserProfileImgModal";
import FriendAction from "./subcomponents/FriendAction";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { useGetUserByIdQuery } from "../../features/apiSlice/userApiSlice/userApiSlice";
import { openModal } from "../../features/modalSlice/modalSlice";

// Assets

import defaultImg from "../../assets/images/default_img.png";

const UserProfile = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const dispatch = useAppDispatch();
  const { userId: activeUserId, userImg } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { userId } = useParams();

  const [activePage, setActivePage] = useState<"posts" | "details">("posts");

  const {
    data: user,
    isLoading,
    isSuccess,
    isFetching,
    isError,
  } = useGetUserByIdQuery(userId as string);

  let content;

  if (isFetching || isLoading) {
    //TODO: create loading component
    content = <div>Loading...</div>;
  } else if (isError) {
    //TODO: handle error properly
    content = <div>Error</div>;
  } else if (isSuccess) {
    content = (
      <>
        <div className="user-profile__presentation">
          {activeUserId === userId && userImg ? (
            <>
              <img
                src={
                  userImg && activeUserId === userId
                    ? userImg
                    : user.profilePicture
                    ? user.profilePicture
                    : defaultImg
                }
                alt="user profile image"
                className="user-profile__img"
                width={150}
                height={150}
                onClick={() => dispatch(openModal("profileImgModal"))}
                style={{ cursor: "pointer" }}
              />
              <UserProfileImgModal />
            </>
          ) : activeUserId === userId ? (
            <ProfileImage />
          ) : (
            <img
              src={user.profilePicture ? user.profilePicture : defaultImg}
              alt="user profile image"
              className="user-profile__img"
              width={150}
              height={150}
            />
          )}
          <div className="user-profile__info">
            <h2 className="user-profile__username">{user.username}</h2>
            <h3 className="user-profile__full-name">
              {user.firstName} {user.lastName}
            </h3>
          </div>
          <FriendAction user={user} />
        </div>
        {isMobile && (
          <UserProfileMobileNavigation
            setActivePage={setActivePage}
            activePage={activePage}
          />
        )}
        {isMobile && activePage === "posts" ? (
          <MainRight userId={userId} />
        ) : isMobile && activePage === "details" ? (
          <MainLeft user={user} />
        ) : (
          isDesktop && (
            <div className="user-profile__main">
              <MainLeft user={user} />
              <MainRight userId={userId} />
            </div>
          )
        )}
      </>
    );
  }
  return <section className="user-profile">{content}</section>;
};

export default UserProfile;
