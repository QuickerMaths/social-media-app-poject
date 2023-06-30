import { useEffect, useState } from "react";
import Post from "../../components/post/originalPost/Post";
import TextArea from "../../components/textArea/TextArea";
import { IPost, IRePost } from "../../components/post/types";
import RePost from "../../components/post/rePost/RePost";

const HomePage = () => {
  //TODO: refactor to Rtk query
  const [posts, setPosts] = useState<IPost[]>([]);
  const [reRender, setReRender] = useState<boolean>(false); //TODO: remove reRender state and use query refetch instead
  useEffect(() => {
    // fetch posts
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts`, {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": `http://localhost:5000`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [reRender]);

  return (
    <section className="home-page">
      <TextArea setReRender={setReRender} reRender={reRender} />
      <ul className="home-page__posts-list">
        {posts
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
          .reverse()}
      </ul>
    </section>
  );
};

export default HomePage;
