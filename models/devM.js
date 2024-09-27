import mongoose from "mongoose";
const devSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    founded: {
      type: Date,
    },
    headquarters: {
      type: String,
      trim: true,
    },
    games: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'games', // Reference to the Game model
    }],
  });
const devS = mongoose.models.category || mongoose.model("dev", devSchema);

export default devS;