import React, { useContext, useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext).user || {};
  // console.log("posts fr Feed: ", posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("http://localhost:4000/api/posts/profile/" + username)
        : await axios.get(
            `http://localhost:4000/api/posts/timeline/${user._id}`
          );
      setPosts(res.data);
    };

    fetchPosts();
  }, [username, user._id]);
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
