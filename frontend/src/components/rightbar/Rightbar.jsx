import React from "react";
import { Users } from "../../dummyData";

const Rightbar = ({ user }) => {
  const HomeRightBar = () => {
    return (
      <>
        {/* Birthday container  */}
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 mr-"
            src="https://freepngimg.com/thumb/gift/75976-gift-two-day-boxes-christmas-red.png"
            alt=""
          />
          <span className="font-thin text-sm">
            <b>Johhny Pusong</b> and <b>3 other friends</b> have a birthday
            today
          </span>
        </div>
        <img
          className="w-full rounded-lg my-8"
          src="https://tse4.mm.bing.net/th?id=OIP.XSXMBIwOoSDreLnR0NNqIgHaEr&pid=Api&P=0&h=180"
          alt=""
        />
        <p className="font-semibold text-gray-600 mb-5">Online Friends</p>
        {/* Freinds  */}
        <ul className="">
          {/* online friend  */}
          {Users.map((user) => (
            <li key={user.id} className="flex mb-4 items-center">
              {/* profile container  */}
              <div className="flex items-center gap-2 w-full mr-3 relative">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.profilePicture}
                  alt={user.username}
                />
                {/* friend name  */}
                <span className="font-semibold text-gray-800">
                  {user.username}
                </span>
                <span className="w-3 h-3 rounded-full absolute bg-green-500 top-0 left-7 border-2 border-white"></span>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <div className="">
        <h1 className="text-lg font-semibold mb-3">User Information</h1>
        {/* Rightbar info  */}
        <div className="mb-8">
          {/* info item  */}
          <div className="mb-3">
            {/* infokey  */}
            <span className="font-semibold mr-4 text-gray-500">City:</span>
            {/* info value  */}
            <span className="text-gray-500 text-sm">{user.city}</span>
          </div>
          {/* info item  */}
          <div className="mb-3">
            {/* infokey  */}
            <span className="font-semibold mr-4 text-gray-500">From:</span>
            {/* info value  */}
            <span className="text-gray-500 text-sm">{user.from}</span>
          </div>
          {/* info item  */}
          <div className="mb-3">
            {/* infokey  */}
            <span className="font-semibold mr-4 text-gray-500">
              Relationship:
            </span>
            {/* info value  */}
            <span className="text-gray-500 text-sm">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h1>User Friends</h1>
        {/* Followings  */}
        <div className="flex flex-wrap gap-2">
          {/* following  */}
          <div className="flex flex-col mb-5 cursor-pointer">
            <img
              className="w-[100px] h-[100px] object-cover rounded-lg"
              src="https://randomuser.me/api/portraits/men/17.jpg"
              alt=""
            />
            <span>James Bond</span>
          </div>
          <div className="flex flex-col mb-5 cursor-pointer">
            <img
              className="w-[100px] h-[100px] object-cover rounded-lg"
              src="https://randomuser.me/api/portraits/men/15.jpg"
              alt=""
            />
            <span>Daniel Black</span>
          </div>
          <div className="flex flex-col mb-5 cursor-pointer">
            <img
              className="w-[100px] h-[100px] object-cover rounded-lg"
              src="https://randomuser.me/api/portraits/women/18.jpg"
              alt=""
            />
            <span>Jane Carter</span>
          </div>
          <div className="flex flex-col mb-5 cursor-pointer">
            <img
              className="w-[100px] h-[100px] object-cover rounded-lg"
              src="https://randomuser.me/api/portraits/men/11.jpg"
              alt=""
            />
            <span>John Doe</span>
          </div>
          <div className="flex flex-col mb-5 cursor-pointer">
            <img
              className="w-[100px] h-[100px] object-cover rounded-lg"
              src="https://randomuser.me/api/portraits/men/13.jpg"
              alt=""
            />
            <span>Mike Johnson</span>
          </div>
          <div className="flex flex-col mb-5 cursor-pointer">
            <img
              className="w-[100px] h-[100px] object-cover rounded-lg"
              src="https://randomuser.me/api/portraits/women/14.jpg"
              alt=""
            />
            <span>Emily Brown</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[92vh] p-5 overflow-y-scroll">
      {/* Rightbar wrapper  */}
      <div className="py-5 pr-5 mr-3">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};

export default Rightbar;
