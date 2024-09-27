import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: [String], // Array of strings for multiple genres
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  picture: {
    type: String, //add url of game pic
    required: true,
  },
  developer: {
    type: String,
    required: true,
    trim: true,
  },
  publisher: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number, // For example, 1 to 10
    min: 1,
    max: 10,
  },
  description: {
    type: String,
    trim: true,
  },
});

const gameS = mongoose.models.games || mongoose.model("games", gameSchema);


export default gameS;