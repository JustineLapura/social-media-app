import React, { useContext } from "react";
import { MdPermMedia, MdLabel, MdEmojiEmotions } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Share = () => {
  return (
    <div className="w-full h-[170px] rounded-lg shadow-xl border">
      {/* Share Wrapper  */}
      <div className="p-3">
        {/* Share top  */}
        <div className="flex items-center">
          {/* Image  */}
          <Link to="/profile">
            <img
              src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/318241363_947108700007554_3906364440796603928_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEF49m17PZPBv82tYtTyKJtnolq__uNpsmeiWr_-42myfdYPIGQJcKAVVw_O8rRUIe1J7p0un7lpA8x7DAcA9af&_nc_ohc=slIE5d0676AAX8nOjpq&_nc_ht=scontent.fceb1-3.fna&oh=00_AfAHJo8Fpj9Xl4NJdszGQdmq80qMJRAjqaCojIiAbms6xQ&oe=659E87B2"
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover mr-3"
            />
          </Link>
          <input
            type="text"
            className="border-none w-[80%] focus:outline-none"
            placeholder="What's in your mind"
          />
        </div>
        <hr className="m-5" />
        {/* Share bottom */}
        <div className="flex items-center justify-between">
          {/* share options  */}
          <div className="flex ml-5">
            {/* share option  */}
            <div className="flex items-center mr-4 cursor-pointer">
              <MdPermMedia className="mr-1 text-red-500" size={25} />
              <span className="font-semibold text-sm text-gray-500">
                Photo or video
              </span>
            </div>
            <div className="flex items-center mr-4 cursor-pointer">
              <MdLabel className="mr-1 text-blue-500" size={25} />
              <span className="font-semibold text-sm text-gray-500">Tag</span>
            </div>
            <div className="flex items-center mr-4 cursor-pointer">
              <IoLocationSharp className="mr-1 text-green-600" size={25} />
              <span className="font-semibold text-sm text-gray-500">
                Location
              </span>
            </div>
            <div className="flex items-center mr-4 cursor-pointer">
              <MdEmojiEmotions className="mr-1 text-yellow-400" size={25} />
              <span className="font-semibold text-sm text-gray-500">
                Feelings
              </span>
            </div>
          </div>
          <button className="p-2 rounded bg-green-500 font-semibold text-white mr-5">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
