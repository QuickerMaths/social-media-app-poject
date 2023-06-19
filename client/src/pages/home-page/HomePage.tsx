import React, { useEffect, useState } from "react";
import Post from "../../components/post/Post";

const HomePage = () => {
  //TODO: refactor to Rtk query
  const [posts, setPosts] = useState<any>([]);
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
  }, []);

  return (
    <section className="home-page">
      <ul className="home-page__posts-list">
        {posts.map((post: any) => (
          <Post key={post._id} post={post} />
        ))}
      </ul>
    </section>
  );
};

export default HomePage;
