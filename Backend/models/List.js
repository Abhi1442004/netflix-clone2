const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movies: [{ type: String }],
});

module.exports = mongoose.model("List", ListSchema);
