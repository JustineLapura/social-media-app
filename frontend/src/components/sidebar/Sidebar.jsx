import React from "react";
import { MdRssFeed, MdGroups } from "react-icons/md";
import { IoIosChatboxes, IoMdBriefcase, IoMdCalendar } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import {
  FaBookmark,
  FaRegQuestionCircle,
  FaGraduationCap,
} from "react-icons/fa";
import "./Sidebar.css";
import { Users } from "../../dummyData";

const Sidebar = () => {
  return (
    <div className="fixed top-[50px] w-1/4 h-[92vh] overflow-y-scroll text-gray-700">
      {/* sidewrapper  */}
      <div className="p-5">
        {/* sidebarlist  */}
        <ul>
          {/* list item  */}
          <li className="flex items-center mb-5">
            <MdRssFeed className="mr-4" />
            <span>Feed</span>
          </li>
          <li className="flex items-center mb-5">
            <IoIosChatboxes className="mr-4" />
            <span>Chats</span>
          </li>
          <li className="flex items-center mb-5">
            <BiSolidVideos className="mr-4" />
            <span>Videos</span>
          </li>
          <li className="flex items-center mb-5">
            <MdGroups className="mr-4" />
            <span>Groups</span>
          </li>
          <li className="flex items-center mb-5">
            <FaBookmark className="mr-4" />
            <span>Bookmarks</span>
          </li>
          <li className="flex items-center mb-5">
            <FaRegQuestionCircle className="mr-4" />
            <span>Questions</span>
          </li>
          <li className="flex items-center mb-5">
            <IoMdBriefcase className="mr-4" />
            <span>Jobs</span>
          </li>
          <li className="flex items-center mb-5">
            <IoMdCalendar className="mr-4" />
            <span>Events</span>
          </li>
          <li className="flex items-center mb-5">
            <FaGraduationCap className="mr-4" />
            <span>Courses</span>
          </li>
        </ul>

        <button className="w-[150px] rounded p-1 bg-gray-300 font-medium">
          Show More
        </button>
        <hr className="my-5" />
        {/* friendlists  */}
        <ul>
          {Users.map((user) => (
            <li key={user.id} className="flex items-center mb-4">
              {/* friendimage  */}
              <img
                src={user.profilePicture}
                alt=""
                className="w-8 h-8 rounded-full object-cover mr-3"
              />
              {/* friend name  */}
              <span className="font-semibold textgr">{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
