import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

const Home = () => {
  return (
    <>
      <div className="w-full flex">
        <Sidebar />
        <div className="w-1/2 mx-auto mt-[50px]">
          <Feed />
        </div>
        <div className=""></div>
        <div className="hidden lg:flex fixed right-0 top-[50px] w-1/4">
          <Rightbar />
        </div>
      </div>
    </>
  );
};

export default Home;
