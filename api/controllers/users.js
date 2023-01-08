const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = require("../models/usersModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.SIGN_UP = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 6);

  const user = new UserSchema({
    name: req.body.name[0].toUpperCase() + req.body.name.slice(1),
    email: req.body.email,
    password: hashedPassword,
    regTimeStamp: req.body.regTimeStamp,
    boughtTickets: [],
    moneyBalance: req.body.moneyBalance,
  });

  const password = req.body.password;
  if (!/\d/.test(password)) {
    return res
      .status(400)
      .send({ error: "Password must contain at least one number" });
  }

  user
    .save()
    .then((result) => {
      return res
        .status(200)
        .json({ response: "User was signed up successfully", user: result });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).json({ response: "Failed" });
    });
};

module.exports.USER_LOGIN = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    console.log(user);

    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
        { algorythm: "RS256" }
      );

      return res
        .status(200)
        .json({ status: "Login successfull", jwt_token: token });
    }
    return res.status(400).json({ status: "Login failed" });
  } catch (err) {
    console.log("req.body", req.body);

    console.log("err", err);
    return res.status(400).json({ status: "Login failed" });
  }
};

module.exports.GET_NEW_JWT_TOKEN = async (req, res) => {
  const jwt_refresh_token = req.headers.jwt_refresh_token;

  jwt.verify(jwt_refresh_token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      const new_jwt_token = jwt.sign(
        {
          email: decoded.email,
          userId: decoded.userId,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        { algorythm: "RS256" }
      );

      return res.status(200).json({
        status: "JWT token was refreshed successfully",
        new_jwt_token,
        jwt_refresh_token,
      });
    } else {
      return res.status(400).json({ status: "Failed" });
    }
  });
};

module.exports.GET_ALL_USERS = async function (req, res) {
  const data = await UserSchema.find().exec();

  data.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  console.log(data);

  return res.status(200).json({ user: data });
};

module.exports.GET_USER_BY_ID = async function (req, res) {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (!err) {
      const data = await UserSchema.aggregate([
        {
          $lookup: {
            from: "tickets",
            localField: "boughtTickets",
            foreignField: "id",
            as: "userTickets",
          },
        },
        { $match: { _id: ObjectId(req.params.id) } },
      ]).exec();

      console.log(data);

      return res.status(200).json({ user: data });
    } else {
      return res.status(400).json({ response: "User not found" });
    }
  });
};

module.exports.GET_ALL_USERS_WITH_TICKETS = async function (req, res) {
  const data = await UserSchema.find().exec();

  console.log(data);

  return res.status(200).json({ user: data });
};
