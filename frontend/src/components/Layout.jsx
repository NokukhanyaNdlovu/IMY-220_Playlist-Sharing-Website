import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Player from "./Player";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
         
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
