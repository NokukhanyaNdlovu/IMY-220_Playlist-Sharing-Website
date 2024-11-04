import React from "react"; 
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import PlayListCard from "./PlayListCard";
import { UserData } from "../context/User";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = UserData();
  const { isDarkMode, setIsDarkMode } = useTheme(); 

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <img src={assets.profile_icon} className="w-10 h-10 rounded-full" alt="ProfilePic" />
          <p className="font-bold">Profile</p>
        </div>
        <p className="font-bold text-2xl fadeInScale">
          Welcome, {user ? user.name : "User"} 
        </p>
      </div>

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="font-semibold">Create A Playlist</p>
          </div>
          <div className="flex items-center gap-3">
            <img src={assets.plus_icon} className="w-8 cursor-pointer" alt="Add" onClick={() => navigate("/create")} />
          </div>
        </div>

        <div onClick={() => navigate("/playlist")}>
          <PlayListCard />
        </div>

        <div className="flex items-center gap-3 pl-8 cursor-pointer my-2" onClick={() => navigate("/friends")}>
          <img src={assets.friends_icon} className="w-8 h-8" alt="Friends" />
          <p className="font-bold text-base">Connect with Friends</p>
        </div>

        {user && user.role === "admin" && (
          <button
            className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4"
            onClick={() => navigate("/admin")}
          >
            Admin Dashboard
          </button>
        )}

        {/* Toggle for light/dark mode */}
        <div className="flex items-center justify-between p-4">
          <p className="font-semibold">Toggle Dark Mode</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={isDarkMode} 
              onChange={() => setIsDarkMode(!isDarkMode)} 
              className="sr-only" 
            />
            <div className={`w-10 h-6 rounded-full ${isDarkMode ? 'bg-green-600' : 'bg-gray-300'} toggle-switch`} />
            <div className={`dot ${isDarkMode ? 'translate-x-4' : 'translate-x-0'} bg-white`}></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
