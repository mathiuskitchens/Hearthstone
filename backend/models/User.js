const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    joinedDate: Date,
    favCards: [String],
    favDecks: [String],
    favClasses: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
