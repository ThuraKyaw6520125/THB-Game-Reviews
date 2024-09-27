import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema({
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
  
  // Middleware to update the 'updatedAt' field before saving
  publisherSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });
  
  const PubS = mongoose.model('Publisher', publisherSchema);
  
  module.exports = PubS;