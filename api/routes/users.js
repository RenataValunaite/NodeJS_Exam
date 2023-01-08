const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  SIGN_UP,
  USER_LOGIN,
  GET_NEW_JWT_TOKEN,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  GET_ALL_USERS_WITH_TICKETS,
} = require("../controllers/users");

router.post("/signUp", SIGN_UP);

router.post("/login", USER_LOGIN);

router.get("/getNewJwtToken", GET_NEW_JWT_TOKEN);

router.get("/getAllUsers", GET_ALL_USERS);

router.get("/getUserById/:id", GET_USER_BY_ID);

router.get("/getAllUsersWithTickets", GET_ALL_USERS_WITH_TICKETS);

module.exports = router;
