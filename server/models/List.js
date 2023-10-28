const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  title: {
    type: String,
    required: true, // Note: fixed typo from "require" to "required"
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
});

module.exports = mongoose.model("List", listSchema);
