import React from "react";
import { IPost } from "../../../components/post/types";
import Post from "../../../components/post/Post";
import TextArea from "../../../components/textArea/TextArea";

interface Props {
  userPosts: { posts: IPost[] };
  reRender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainRight: React.FC<Props> = ({ userPosts, reRender, setRerender }) => {
  return (
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
  );
};

export default MainRight;
