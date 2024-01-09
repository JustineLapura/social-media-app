import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { IoPersonSharp, IoNotifications } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications, IoIosChatbubbles } from "react-icons/io";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useContext(AuthContext).user || {};
  console.log("User: ", user);

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="h-[50px] w-full bg-blue-900 flex items-center fixed top-0 z-10">
      {/* left  */}
      <div className="w-3/12  text-[24px] text-white ml-5 font-bold cursor-pointer">
        <Link to="/">
          <span>Jahz10 Social</span>
        </Link>
      </div>
      {/* center  */}
      <div className="w-5/12 ">
        {/* Search Bar  */}
        <div className="w-full h-[30px] rounded-full bg-white flex items-center">
          <CiSearch className="ml-3" size={20} />
          <input
            type="text"
            placeholder="Search a friend, post or video"
            className="border-none w-[70%] outline-none"
          />
        </div>
      </div>
      {/* right  */}
      <div className="w-4/12 flex items-center justify-around text-white">
        {/* Topbar links  */}
        <div className="">
          <Link to="/">
            <span className="ml-3 cursor-pointer text-[14px]">Homepage</span>
          </Link>
          {user && (
            <>
              <span
                onClick={handleLogout}
                className="ml-3 cursor-pointer text-[14px] border px-3 py-1 rounded-xl bg-green-500"
              >
                Logout
              </span>
            </>
          )}
        </div>
        {/* Topbar icons  */}
        <div className="flex">
          {/* topbar icon item  */}
          <div className="relative flex items-center mr-4 cursor-pointer">
            <IoPersonSharp size={20} />
            <span className="w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full absolute -top-[7px] -right-[7px] text-xs">
              1
            </span>
          </div>
          {/* topbar icon item  */}
          <div className="relative flex items-center mr-4 cursor-pointer">
            <IoIosChatbubbles size={20} />
            <span className="w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full absolute -top-[7px] -right-[7px] text-xs">
              2
            </span>
          </div>
          {/* topbar icon item  */}
          <div className="relative flex items-center mr-4 cursor-pointer">
            <IoNotifications size={20} />
            <span className="w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full absolute -top-[7px] -right-[7px] text-xs">
              1
            </span>
          </div>
        </div>
        <Link to="/profile">
          <img
            src={
              (user && user.profilePicture) ||
              "https://tse1.mm.bing.net/th?id=OIP.Qv18Sm9Mw5F8Cy2aIjGm_QAAAA&pid=Api&P=0&h=180"
            }
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
            alt=""
          />
        </Link>
        {/* <div className="border-2 h-8 w-8 rounded-full overflow-hidden flex justify-center items-center">
          <IoPersonSharp className="w-full h-full cursor-pointer" />
        </div> */}
      </div>
    </div>
  );
};

export default Topbar;
