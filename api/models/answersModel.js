const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  userId: { type: String, required: true, min: 10 },
  questionId: { type: String, required: true, min: 10 },
  answer: { type: String, required: true, min: 3 },
  regTimeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Answers", answerSchema);
