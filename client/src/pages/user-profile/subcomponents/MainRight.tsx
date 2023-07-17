// External dependencies

import React, { useEffect, useState } from "react";

// Internal dependencies

import { IPost, IRePost } from "../../../components/post/types";
import Post from "../../../components/post/post-wrapper/original-post/Post";
import TextArea from "../../../components/textArea/TextArea";
import RePost from "../../../components/post/post-wrapper/rePost/RePost";

interface Props {
  userId: string | undefined;
}

const MainRight: React.FC<Props> = ({ userId }) => {
  const [reRender, setReRender] = useState<boolean>(false);
  //TODO: set type insted of any
  const [userPosts, setUserPosts] = useState<any>(null);
  useEffect(() => {
    const getUsersPosts = async (userId: string) => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/posts/user/${userId}`,
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
              "Access-Control-Allow-Origin": `http://localhost:5000`,
              "Content-Type": "application/json",
            },
          }
        );
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
        {userPosts.length > 0 ? (
          userPosts
            .map((post: IPost | IRePost) =>
              post.isRePost ? (
                <RePost
                  key={(post as IRePost)._id}
                  rePost={post as IRePost}
                  reRender={reRender}
                  setReRender={setReRender}
                />
              ) : (
                <Post
                  key={(post as IPost)._id}
                  post={post as IPost}
                  setReRender={setReRender}
                  reRender={reRender}
                /> //TODO: while refactor to rktquery switch sorting posts using entity adapter
              )
            )
            .reverse()
        ) : (
          <p className="user-profile__no-posts-msg">No posts yet...</p>
        )}
      </ul>
    </div>
  );
};

export default MainRight;
