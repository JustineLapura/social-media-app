import React, { useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";


const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  // console.log("posts fr Feed: ", posts); 

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("http://localhost:4000/api/posts/profile/" + username)
        : await axios.get(
            "http://localhost:4000/api/posts/timeline/65795b28cf5e81e469c8ca13"
          );
      setPosts(res.data);
    };

    fetchPosts();
  }, [username]);
  return (
    <div className="h-[92vh] p-5">
      <Share />
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
