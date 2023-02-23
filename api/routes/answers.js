const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  GET_ANSWERS_BY_QUESTION_ID,
  POST_ANSWER_BY_QUESTION_ID,
  DELETE_ANSWER,
} = require("../controllers/answers");

router.get("/question/:id/answers", auth, GET_ANSWERS_BY_QUESTION_ID);

router.post("/question/:id/answer", POST_ANSWER_BY_QUESTION_ID);

router.delete("/answer/:id", auth, DELETE_ANSWER);

module.exports = router;
