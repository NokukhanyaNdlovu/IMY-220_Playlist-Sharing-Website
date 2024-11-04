import { Album } from "../models/Album.js";
import { Song } from "../models/Song.js";
import TryCatch from "../utils/TryCatch.js";
import getDataurl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";
import { Playlist } from "../models/Playlist.js"; 

export const createAlbum = TryCatch(async (req, res) => {
  /*if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not admin",
    });*/

  const { title, description, category, hashtags } = req.body;

  const file = req.file;

  const fileUrl = getDataurl(file);

  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  await Album.create({
    title,
    description,
    category, 
    hashtags,
    thumbnail: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
  });

  res.json({
    message: "Playlist Added",
  });
});

export const createPlaylist = TryCatch(async (req, res) => {
  const { title } = req.body;

  const playlist = await Playlist.create({
    title,
    user: req.user._id,
  });

  res.status(201).json({
    message: "Playlist created",
    playlist,
  });
});
export const addSongToPlaylist = TryCatch(async (req, res) => {
  const { playlistId } = req.params;
  const { songId } = req.body; 

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  // a check to avoid duplicates
  if (playlist.songs.includes(songId)) {
    return res.status(400).json({ message: "Song already in playlist" });
  }

  playlist.songs.push(songId);
  await playlist.save();

  res.json({
    message: "Song added to playlist",
    playlist,
  });
});

export const getUserPlaylists = TryCatch(async (req, res) => {
  const playlists = await Playlist.find({ user: req.user._id }).populate('songs');

  res.json(playlists);
});


export const getAllAlbums = TryCatch(async (req, res) => {
  const albums = await Album.find();

  res.json(albums);
});

export const addSong = TryCatch(async (req, res) => {
  /*if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not admin",
    });
*/
  const { title, description, singer, album } = req.body;

  const file = req.file;

  const fileUrl = getDataurl(file);

  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
    resource_type: "video",
  });

  await Song.create({
    title,
    description,
    singer,
    audio: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
    album,
  });

  res.json({
    message: "Song Added",
  });
});

export const addThumbnail = TryCatch(async (req, res) => {
  /*if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not admin",
    });*/

  const file = req.file;

  const fileUrl = getDataurl(file);

  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  await Song.findByIdAndUpdate(
    req.params.id,
    {
      thumbnail: {
        id: cloud.public_id,
        url: cloud.secure_url,
      },
    },
    { new: true }
  );

  res.json({
    message: "thumbnail Added",
  });
});

export const getAllSongs = TryCatch(async (req, res) => {
  const songs = await Song.find();

  res.json(songs);
});


//filter by plasylist
export const getAllSongsByAlbum = TryCatch(async (req, res) => {
  const album = await Album.findById(req.params.id);
  const songs = await Song.find({ album: req.params.id });

  res.json({ album, songs });
});

export const deleteSong = TryCatch(async (req, res) => {
  const song = await Song.findById(req.params.id);

  await song.deleteOne();

  res.json({ message: "Song Deleted" });
});

export const getSingleSong = TryCatch(async (req, res) => {
  const song = await Song.findById(req.params.id);

  res.json(song);
});
