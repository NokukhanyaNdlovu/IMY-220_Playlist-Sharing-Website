import React, { useEffect, useState } from "react";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { UserData } from "../context/User";
import { SongData } from "../context/Song";
import UserPlaylistManager from "./UserPlaylistManager"; 

const SongItem = ({ image, name, desc, id }) => {
  const [saved, setSaved] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false); // State to control modal visibility
  const { addToPlaylist, user } = UserData();
  const { setSelectedSong, isPlaying, setIsPlaying } = SongData();
  const playList = user.playlist;

  useEffect(() => {
    if (playList && playList.includes(id)) {
      setSaved(true);
    }
  }, [user, playList, id]);

  const openPlaylistModal = () => {
    setShowPlaylistModal(true); 
  };

  const closePlaylistModal = () => {
    setShowPlaylistModal(false); 
  };

  const handleSave = (selectedPlaylist) => {
    addToPlaylist(id, selectedPlaylist); // Save to the selected playlist
    setSaved(true);
    closePlaylistModal(); 
  };

  return (
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <div className="relative group">
        <img src={image} className="rounded w-[160px]" alt="" />
        <div className="flex gap-2">
          <button
            className="absolute bottom-2 right-2 bg-blue-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={openPlaylistModal}
          >
            {saved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>

      {showPlaylistModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#2e2e2e] p-8 rounded-lg shadow-2xl max-w-2xl w-4/5 relative transition-all duration-300">
            <UserPlaylistManager onSave={handleSave} onClose={closePlaylistModal} />
            <button
              className="absolute top-3 right-3 text-gray-300 hover:text-gray-100"
              onClick={closePlaylistModal}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongItem;
