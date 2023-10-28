const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Ensure this is hashed using something like bcrypt before saving.
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("User", userSchema);
