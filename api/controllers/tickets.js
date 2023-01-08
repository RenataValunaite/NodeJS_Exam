const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const TicketSchema = require("../models/ticketsModel");
const UserSchema = require("../models/usersModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.CREATE_TICKET = function (req, res) {
  const ticket = new TicketSchema({
    title: req.body.title,
    ticketPrice: req.body.ticketPrice,
    fromLocation: req.body.fromLocation,
    toLocation: req.body.toLocation,
    toLocationPhotoUrl: req.body.toLocationPhotoUrl,
  });

  ticket.save().then((result) => {
    console.log(result._id);

    TicketSchema.updateOne({ _id: result._id }, { id: result._id }).exec();

    return res.status(200).json({
      response: "Ticket was created successfully",
      ticket: ticket,
    });
  });
};

module.exports.BUY_TICKET = async function (req, res) {
  const user = await UserSchema.findOne({ _d: ObjectId }).exec();
  console.log("userId", user._id);

  const ticket = await TicketSchema.findOne({ _d: ObjectId }).exec();
  console.log("ticketId", ticket._id);

  const userId = req.body.userId;
  const ticketId = req.body.ticketId;
  const moneyBalance = req.body.moneyBalance;

  const newBalance = user.moneyBalance - ticket.ticketPrice;

  UserSchema.updateOne(
    { _id: userId },
    {
      moneyBalance: newBalance,
      $push: {
        boughtTickets: ObjectId(ticketId),
      },
    }
  ).then(() => {
    return res.status(200).json({ response: "Ticket was bought successfully" });
  });

  if (user.moneyBalance < ticket.ticketPrice) {
    res.status(400).send({ response: "Insufficient money balance" });
    return;
  } else {
    user.moneyBalance -= ticket.ticketPrice;
    user.boughtTickets.push(ticketId);
    await user.save();
  }
};
