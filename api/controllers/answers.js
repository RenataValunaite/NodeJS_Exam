const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AnswerSchema = require("../models/answersModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.POST_ANSWER_BY_QUESTION_ID = function (req, res) {
  const answer = new AnswerSchema({
    userId: req.body.userId,
    questionId: req.body.questionId,
    answer: req.body.answer,
  });

  answer.save().then((result) => {
    console.log(result._id);

    AnswerSchema.updateOne({ _id: result._id }, { id: result._id }).exec();

    return res.status(200).json({
      response: "Answer was posted successfully",
      answer: answer,
    });
  });
};

module.exports.GET_ANSWERS_BY_QUESTION_ID = function (req, res) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).end();
  }
  const tokenId = jwt.verify(token, process.env.JWT_SECRET);
  req.body.id = tokenId.userId;
  AnswerSchema.find({ questionId: req.body.id }).then((results) => {
    return res.status(200).json({ answers: results });
  });
};

module.exports.DELETE_ANSWER = function (req, res) {
  const answerIndex = answers.findAnswerIndex(
    (answer) => answer.id === req.params.id
  );

  console.log("answer", answers);
  res.status(200).json({ deletedAnswer: deletedValue });
};
