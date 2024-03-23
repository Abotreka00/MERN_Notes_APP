const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  color: { type: String, default: "#ffffff" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", NotesSchema);
