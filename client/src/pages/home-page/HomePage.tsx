import { useEffect, useState } from "react";
import Post from "../../components/post/Post";
import TextArea from "../../components/textArea/TextArea";
import { IPost } from "../../components/post/types";

const HomePage = () => {
  //TODO: refactor to Rtk query
  const [posts, setPosts] = useState<any>([]);
  const [reRender, setReRender] = useState<boolean>(false); //TODO: remove reRender state and use query refetch instead
  useEffect(() => {
    // fetch posts
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/posts`, {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": `http://localhost:5000`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [reRender]);


  return (
    <section className="home-page">
      <TextArea setRerender={setReRender} reRender={reRender} />
      <ul className="home-page__posts-list">
        {posts
          .map((post: any) => (
            <Post key={post._id} post={post} /> //TODO: while refactor to rktquery switch sorting posts using entity adapter
          ))
          .reverse()}
      </ul>
    </section>
  );
};

export default HomePage;
