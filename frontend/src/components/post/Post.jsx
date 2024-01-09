import React, { useContext, useEffect, useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { IoHeartCircleSharp } from "react-icons/io5";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const [likeData, setLikeData] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  // const { user: currentUser } = useContext(AuthContext).user || {};
  // console.log("User fr Post: ", currentUser);
  
  // console.log("user fr Post:", user);
  // console.log("post fr Post: ", post);
  // const realUser = user.filter((u) => u._id === post.userId);
  // console.log("Real User: ", realUser);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/users/${post.userId}`
      );
      setUser(res.data);
    };

    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    setLikeData(isLiked ? likeData - 1 : likeData + 1);
    setIsLiked(!isLiked);
  };

  return (
    // Post
    <div className="w-full rounded-lg shadow-xl border my-8 mb08">
      {/* Post Wrapper  */}
      <div className="p-3">
        {/* Post top  */}
        <div className="flex items-center justify-between">
          {/* topleft  */}
          <div className="flex items-center ">
            {/* Profile image  */}
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture ||
                  "https://tse1.mm.bing.net/th?id=OIP.Qv18Sm9Mw5F8Cy2aIjGm_QAAAA&pid=Api&P=0&h=180"
                }
                alt=""
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
              />
            </Link>
            <Link to={`/profile/${user.username}`}>
              <span className="font-semibold mx-3">{user.username}</span>
            </Link>

            <span className="text-sm">{format(post.createdAt)}</span>
          </div>
          {/* topright  */}
          <div className="">
            <MdMoreVert />
          </div>
        </div>
        {/* Post center  */}
        <div className="my-5">
          {/* Post text  */}
          <span>{post.desc}</span>
          <img
            className="mt-5 w-full max-h-[500px] obje"
            src={post.img}
            alt=""
          />
        </div>
        {/* Post bottom  */}
        <div className="flex items-center justify-between">
          {/* left  */}
          <div className="flex items-center">
            <div className="flex items-center">
              <img
                className="w-7 h-7 rounded-full object-cover  cursor-pointer hover:scale-125 duration-200"
                src="https://bant.io/blog/wp-content/uploads/2019/04/1024px-Facebook_Like_button.svg_.png"
                alt=""
                onClick={likeHandler}
              />
              <IoHeartCircleSharp
                className="text-red-500 cursor-pointer hover:scale-125 duration-200"
                size={33}
                onClick={likeHandler}
              />
            </div>
            <span className="text-sm text-gray-700">
              {likeData} people liked it
            </span>
          </div>
          {/* right  */}
          <div className="">
            {/* post comment text  */}
            <span className="cursor-pointer border-b text-sm">
              {post.comment > 1
                ? `${post.comment} comments`
                : `${post.comment} comment`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
