//Database Schema setup
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  position: {
    type: Number,
  },
  team: {
    type: String,
  },
  gamesPlayed: {
    type: Number,
  },
  goalsScored: {
    type: Number,
  },
  goalsConceeded: {
    type: Number,
  },
  goalDifference: {
    type: Number,
  },
  points: {
    type: Number,
  },
});

module.exports = mongoose.model("TeamSchema", teamSchema);
