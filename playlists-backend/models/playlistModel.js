const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  numOfSongs: { type: Number, required: true },
  likes: { type: Number, required: true },
  isEnabled: { type: Boolean, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

playlistSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const Playlist = mongoose.model("playlist-apps", playlistSchema);

module.exports = Playlist;