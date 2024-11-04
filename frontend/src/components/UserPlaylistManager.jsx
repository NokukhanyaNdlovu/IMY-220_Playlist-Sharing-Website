import React, { useEffect, useState } from "react";
import { SongData } from "../context/Song";
import { UserData } from "../context/User";

const UserPlaylistManager = ({ onSave, onClose }) => {
  const { albums, loading } = SongData();
  const { user } = UserData();
  
  const [selectedOption, setSelectedOption] = useState(""); // track if album or playlist is selected
  const [selectedId, setSelectedId] = useState(""); //  hold the selected album or playlist ID

  
  useEffect(() => {
    if (user.playlists && user.playlists.length > 0) {
      setSelectedId(user.playlists[0]._id); // Set default selected ID if playlists exist
    }
  }, [user]);

  const handleSave = () => {
    if (selectedId) {
      onSave(selectedId); 
    }
  };

  return (
    <div className="text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Add to Playlist</h2>

      
      <select
        className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
        value={selectedOption}
        onChange={(e) => {
          const value = e.target.value;
          setSelectedOption(value);
          setSelectedId(value); 
        }}
      >
        <option value="">Select an Album/Playlist</option>
        
       
        {albums && albums.map((album) => (
          <option key={album._id} value={album._id}>
            {album.title}
            {album.thumbnail && (
              <img
                src={album.thumbnail}
                alt={album.title}
                className="inline-block h-6 w-6 ml-2"
              />
            )}
          </option>
        ))}

        {/* Render playlists */}
        {user.playlists && user.playlists.map((playlist) => (
          <option key={playlist._id} value={playlist._id}>
            {playlist.name}
          </option>
        ))}
      </select>

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading || !selectedId} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Saving..." : "Add to Playlist"}
        </button>
      </div>
    </div>
  );
};

export default UserPlaylistManager;
