const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UsersSchema);
