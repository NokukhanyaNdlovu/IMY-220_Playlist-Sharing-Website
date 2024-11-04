import React, { useState } from "react";
import { UserData } from "../context/User";

const CreatePlaylist = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [songs, setSongs] = useState([]);

  const { createPlaylist } = UserData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const playlistData = {
      name,
      category,
      description,
      coverImage,
      hashtags: hashtags.split(",").map(tag => tag.trim()),
      songs,
    };
    createPlaylist(playlistData);
  };

  return (
    <form onSubmit={handleSubmit} className="create-playlist-form">
      <input
        type="text"
        placeholder="Playlist Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <textarea
        placeholder="Short Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Cover Image URL"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Hashtags (comma-separated)"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
      />
      {/* You can implement a way to select songs for the playlist */}
      <button type="submit">Create Playlist</button>
    </form>
  );
};

export default CreatePlaylist;
