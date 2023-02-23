const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const QuestionSchema = require("../models/questionsModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.POST_QUESTION = function (req, res) {
  const question = new QuestionSchema({
    userId: req.body.userId,
    question: req.body.question,
    description: req.body.description,
  });

  question.save().then((result) => {
    console.log(result._id);

    QuestionSchema.updateOne({ _id: result._id }, { id: result._id }).exec();

    return res.status(200).json({
      response: "Question was posted successfully",
      result: result,
    });
  });
};

module.exports.GET_QUESTIONS = function (req, res) {
  QuestionSchema.find().then((results) => {
    return res.status(200).json({ questions: results });
  });
};

module.exports.DELETE_QUESTION = function (req, res) {
  const questionIndex = questions.findQuestionIndex(
    (question) => question._id === req.params._id
  );

  console.log("question", questions);
  res.status(200).json({ deletedQuestion: deletedValue });
};
