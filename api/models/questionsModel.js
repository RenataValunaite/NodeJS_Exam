const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  userId: { type: String, required: true, min: 10 },
  question: { type: String, required: true, min: 3 },
  description: { type: String, required: true, min: 3 },
  votes: { type: Number },
  answers: { type: Number },
  views: { type: Number },
});

module.exports = mongoose.model("Questions", questionSchema);
