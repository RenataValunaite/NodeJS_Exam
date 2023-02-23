const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  email: { type: String, required: true, min: 3 },
  password: { type: String, required: true, min: 3 },
  questionIds: { type: Array },
  answerIds: { type: Array },
  votes: { type: Number },
  regTimeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", userSchema);
