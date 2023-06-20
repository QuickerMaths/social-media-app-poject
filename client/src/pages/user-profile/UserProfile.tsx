import { useEffect, useState } from "react";
import { useParams } from "react-router";
import defaultImg from "../../assets/images/default_img.png";

const UserProfile = () => {
  //getting id from url to enable fetching user data even if opened in new tab
  const { userId } = useParams();
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const getUser = async (userId: string) => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: "GET",
          mode: "cors",
          credentials: "include",
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
  }, []);
  return (
    <section className="user-profile">
      <div className="user-profile__presentation">
        <img
          src={defaultImg}
          alt="user profile image"
          className="user-profile__img"
        />
        <h2 className="user-profile__username">{user.username}</h2>
      </div>
    </section>
  );
};

export default UserProfile;
