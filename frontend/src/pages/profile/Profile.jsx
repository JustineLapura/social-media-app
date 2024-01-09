import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const { username } = useParams();
  // console.log("Params: ", { username });
  // console.log("user fr Profile: ", user);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/users/username/${username}`
      );
      setUser(res.data);
    };

    fetchUser();
  }, []);
  return (
    <>
      profile
      {/* Profile  */}
      <div className="w-full flex">
        <Sidebar />
        {/* Profile Right  */}
        <div className="w-3/4 ml-auto">
          {/* top  */}
          <div className="">
            {/* profile cover  */}
            <div className="relative h-[320px]">
              {/* cover photo  */}
              <img
                className="w-full h-[250px] object-cover"
                src={
                  user.coverPicture ||
                  "https://www.cityguideny.com/cgarticle/nocover670x.jpg"
                }
                alt="cover photo"
              />
              {/* profile picture  */}
              <img
                className="absolute left-0 right-0 top-1/2 m-auto border-[3px] border-white w-[150px] h-[150px] rounded-full object-cover "
                src={
                  user.profilePicture ||
                  "https://tse1.mm.bing.net/th?id=OIP.Qv18Sm9Mw5F8Cy2aIjGm_QAAAA&pid=Api&P=0&h=180"
                }
                alt="profile image"
              />
            </div>
            {/* profile info  */}
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
              <span className="text-sm font-semibold">{user.desc}</span>
            </div>
          </div>
          {/* bottom  */}
          <div className="flex">
            <Feed username="justine" />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
