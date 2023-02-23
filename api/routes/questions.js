const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  GET_QUESTIONS,
  POST_QUESTION,
  DELETE_QUESTION,
} = require("../controllers/questions");

router.get("/questions/", GET_QUESTIONS);

router.post("/question", POST_QUESTION);

router.delete("/question/:id", DELETE_QUESTION);

module.exports = router;
