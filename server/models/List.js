const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
});

module.exports = mongoose.model("List", listSchema);
