import { useEffect, useState } from "react";
import { useParams } from "react-router";
import defaultImg from "../../assets/images/default_img.png";
import useMediaQuery from "../../hooks/useMediaQuery";
import { IPost } from "../../components/post/types";
import TextArea from "../../components/textArea/TextArea";
import Post from "../../components/post/Post";
import UserDetails from "../../components/user-details/UserDetails";
import UserFriends from "../../components/user-friends/UserFriends";
import UserProfileMobileNavigation from "../../components/user-profile-mobile-navigation/UserProfileMobileNavigation";

const UserProfile = () => {
  const isMobile = useMediaQuery("(max-width: 1025px)");
  const [activePage, setActivePage] = useState<"posts" | "details">("posts");
  //getting id from url to enable fetching user data even if opened in new tab
  const { userId } = useParams();

  const [reRender, setRerender] = useState<boolean>(false);
  const [reRenderAddress, setRerenderAddress] = useState<boolean>(false);

  //TODO: refactor fetch to rtkQuery
  const [user, setUser] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any>(null);
  useEffect(() => {
    const getUser = async (userId: string) => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": `http://localhost:5000`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser(userId as string);
  }, [reRenderAddress, userId]);

  useEffect(() => {
    const getUsersPosts = async (userId: string) => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${userId}`, {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": `http://localhost:5000`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setUserPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsersPosts(userId as string);
  }, [reRender, userId]);

  //TODO: refactor loading to spinner and use react suspense instead of something like this

  if (!userPosts) return <div>Loading...</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <section className="user-profile">
      <div className="user-profile__presentation">
        <img
          src={defaultImg}
          alt="user profile image"
          className="user-profile__img"
          width={150}
          height={150}
        />
        <div className="user-profile__info">
          <h2 className="user-profile__username">{user.username}</h2>
          <h3 className="user-profile__full-name">
            {user.firstName} {user.lastName}
          </h3>
        </div>
      </div>
      {isMobile && (
        <UserProfileMobileNavigation
          setActivePage={setActivePage}
          activePage={activePage}
        />
      )}
      {/* <div className="user-profile__main">
        <div className="user-profile__main-left">
          <UserDetails
            createdAt={user.createdAt}
            address={user.address}
            userId={userId as string}
            reRenderAddress={reRenderAddress}
            setRerenderAddress={setRerenderAddress}
          />
          <UserFriends />
        </div>
        <div className="user-profile__main-right">
          <TextArea reRender={reRender} setRerender={setRerender} />

          <ul className="user-profile__posts-list">
            {userPosts.posts.length > 0 ? (
              userPosts.posts
                .map((post: IPost) => <Post key={post._id} post={post} />)
                .reverse()
            ) : (
              <p className="user-profile__no-posts-msg">No posts yet...</p>
            )}
          </ul>
        </div>
      </div> */}
    </section>
  );
};

export default UserProfile;
