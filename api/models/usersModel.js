const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  email: { type: String, required: true, min: 3 },
  password: { type: String, required: true, min: 3 },
  boughtTickets: { type: Array },
  moneyBalance: { type: Number },
  regTimeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
