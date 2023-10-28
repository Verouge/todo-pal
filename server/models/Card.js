const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  list: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
  dueDate: Date,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Card", cardSchema);
