//models/gameMod.js
import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  publishers: {
    type: [String],
    required: true
  },
  developers: {
    type: [String],
    required: true
  },
  image_background: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const gameS = mongoose.models.gameS || mongoose.model("gameS", gameSchema);

export default gameS;