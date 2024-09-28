//models/pubMod.js
import mongoose from "mongoose";
const pubSchema = new mongoose.Schema({
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

const pubS = mongoose.models.pubS || mongoose.model("pubS", pubSchema);

export default pubS;