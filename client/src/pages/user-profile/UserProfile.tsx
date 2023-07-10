import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import defaultImg from "../../assets/images/default_img.png";
import useMediaQuery from "../../hooks/useMediaQuery";
import UserProfileMobileNavigation from "../../components/user-profile-mobile-navigation/UserProfileMobileNavigation";
import MainLeft from "./subcomponents/MainLeft";
import MainRight from "./subcomponents/MainRight";
import ProfileImage from "./subcomponents/ProfileImage";
import UserProfileImgModal from "../../portals/user-profile-img-modal/UserProfileImgModal";
import { IUser, IUserBasicData } from "./types";
import SendFriendRequest from "../../components/send-friend-request/SendFriendRequest";
import RemoveFriend from "../../components/remove-friends/RemoveFriend";
import { useGetUserByIdQuery } from "../../features/apiSlice/userApiSlice/userApiSlice";

const UserProfile = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const { userId: activeUserId, userImg } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [activePage, setActivePage] = useState<"posts" | "details">("posts");
  //getting id from url to enable fetching user data even if opened in new tab
  const { userId } = useParams();

  const [reRenderAddress, setRerenderAddress] = useState<boolean>(false);

  //TODO: refactor modal open state to redux slice
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, isLoading, isSuccess, isFetching, isError, error, refetch } =
    useGetUserByIdQuery(userId as string);

  let content;
  if (isFetching || isLoading) {
    //TODO: create loading component
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    const { data: user } = data;

    const alreadyFriends = (friend: IUserBasicData) =>
      friend._id === activeUserId;

    const showSendRequestButton =
      activeUserId &&
      activeUserId !== userId &&
      (!data?.data ||
        (data?.data.friends as IUserBasicData[]).every(alreadyFriends));
    const showRemoveButton =
      activeUserId &&
      activeUserId !== userId &&
      (!data?.data ||
        !(data?.data.friends as IUserBasicData[]).every(alreadyFriends));

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
                onClick={() => setIsOpen(true)}
                style={{ cursor: "pointer" }}
              />
              <UserProfileImgModal
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                userId={userId}
              />
            </>
          ) : activeUserId === userId ? (
            <ProfileImage userId={userId} />
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
          {showSendRequestButton && <SendFriendRequest />}
          {showRemoveButton && <RemoveFriend />}
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
          <MainLeft
            user={user}
            reRenderAddress={reRenderAddress}
            setRerenderAddress={setRerenderAddress}
          />
        ) : (
          isDesktop && (
            <div className="user-profile__main">
              <MainLeft
                user={user}
                reRenderAddress={reRenderAddress}
                setRerenderAddress={setRerenderAddress}
              />
              <MainRight userId={userId} />
            </div>
          )
        )}
      </>
    );
  } else if (isError) {
    //TODO: handle error properly
    content = <div>Error</div>;
  }

  return <section className="user-profile">{content}</section>;
};

export default UserProfile;
