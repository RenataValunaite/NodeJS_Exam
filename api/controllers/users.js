const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = require("../models/usersModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.REGISTER = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 6);

  const user = new UserSchema({
    name: req.body.name[0].toUpperCase() + req.body.name.slice(1),
    email: req.body.email,
    password: hashedPassword,
    regTimeStamp: req.body.regTimeStamp,
    questionIds: [],
    answerIds: [],
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
