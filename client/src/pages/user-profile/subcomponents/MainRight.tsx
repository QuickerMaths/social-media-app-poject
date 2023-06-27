import React, { useEffect, useState } from "react";
import { IPost } from "../../../components/post/types";
import Post from "../../../components/post/Post";
import TextArea from "../../../components/textArea/TextArea";

interface Props {
  userId: string | undefined;
}

const MainRight: React.FC<Props> = ({ userId }) => {
  const [reRender, setReRender] = useState<boolean>(false);
  const [userPosts, setUserPosts] = useState<any>(null);
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

  return (
    <div className="user-profile__main-right">
      <TextArea reRender={reRender} setReRender={setReRender} />

      <ul className="user-profile__posts-list">
        {userPosts.posts.length > 0 ? (
          userPosts.posts
            .map((post: IPost) => (
              <Post
                key={post._id}
                post={post}
                reRender={reRender}
                setReRender={setReRender}
              />
            ))
            .reverse()
        ) : (
          <p className="user-profile__no-posts-msg">No posts yet...</p>
        )}
      </ul>
    </div>
  );
};

export default MainRight;
