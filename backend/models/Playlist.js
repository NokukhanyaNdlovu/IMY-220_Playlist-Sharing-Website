// models/Playlist.js
import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const Playlist = mongoose.model("Playlist", playlistSchema);
