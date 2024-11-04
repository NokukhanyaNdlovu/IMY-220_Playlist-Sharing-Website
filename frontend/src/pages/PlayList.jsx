import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import { assets } from "../assets/assets";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { UserData } from "../context/User";

const PlayList = ({ user }) => {
  const { songs, setSelectedSong, setIsPlaying } = SongData();
  const { playlists } = user; 
  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    if (songs && user && Array.isArray(user.playlist)) {
      const filteredSongs = songs.filter((e) =>
        user.playlist.includes(e._id.toString())
      );
      setMyPlaylist(filteredSongs);
    }
  }, [songs, user]);

  const onclickHander = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const { addToPlaylist } = UserData();

  const savePlayListHandler = (id) => {
    addToPlaylist(id);
  };

  return (
    <Layout>
    {playlists.map((playlist, index) => (
      <div key={index}>
        <h2>{playlist.name}</h2>
        <img src={playlist.coverImage} alt={playlist.name} />
        <p>{playlist.description}</p>
        {/* Map songs in the playlist */}
        {playlist.songs.map((songId) => {
          const song = songs.find((s) => s._id === songId);
          return (
            <div key={songId} className="song-item">
              <p>{song.title}</p>
              <button onClick={() => {
                setSelectedSong(songId);
                setIsPlaying(true);
              }}>Play</button>
            </div>
          );
        })}
      </div>
    ))}
  </Layout>
  );
};

export default PlayList;
