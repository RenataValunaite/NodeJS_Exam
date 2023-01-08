const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  title: { type: String, required: true, min: 3 },
  ticketPrice: { type: Number },
  fromLocation: { type: String },
  toLocation: { type: String },
  toLocationPhotoUrl: { type: String, required: true, min: 3 },
});

module.exports = mongoose.model("Tickets", ticketSchema);
