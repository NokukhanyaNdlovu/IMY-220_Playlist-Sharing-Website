// Navbar.jsx
import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/User";

const Navbar = ({ onTabChange, onSearch }) => {
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();
  const { logoutUser } = UserData();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    onSearch(term); // search term to home
  };

  return (
    <>
     <div className="w-full flex flex-col">
      <div className="w-full flex justify-between items-center font-semibold">
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={assets.search_icon} className="w-6" alt="Search" />
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search songs or playlists..."
            className="bg-transparent border-b border-white focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-4">
          <p
            className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl cursor-pointer"
            onClick={logoutUser}
          >
            Logout
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-8">
          {["All", "Songs", "Playlists"].map((tab) => (
            <div
              key={tab}
              className={`tab-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
              {activeTab === tab && <div className="underline" />}
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
