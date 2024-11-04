import mongoose from "mongoose";
//cateogory is opt
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      id: String,
      url: String,
    },
    category: {
      type: String,
      default: "", 
    },
    hashtags: {
      type: [String], 
      default: [], 
    },
  },

  {
    timestamps: true,
  }
);

export const Album = mongoose.model("Album", schema);
