const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
