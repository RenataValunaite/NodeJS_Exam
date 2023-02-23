const express = require("express");
const bodyParser = require("body-parser");
const questionsRoutes = require("./api/routes/questions");
const answersRoutes = require("./api/routes/answers");
const usersRoutes = require("./api/routes/users");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const app = express();

var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
  .then(console.log("connected"))
  .catch((err) => {
    console.log("xxxxxxxxxxxxxxxxxx");
    console.log(err);
  });

app.use(answersRoutes);
app.use(questionsRoutes);
app.use(usersRoutes);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.listen(3000);
