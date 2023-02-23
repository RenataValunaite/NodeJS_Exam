const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const { REGISTER, USER_LOGIN } = require("../controllers/users");

router.post("/signUp", REGISTER);

router.post("/login", USER_LOGIN);

module.exports = router;
