const express = require("express");
// Initializing the express app
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const taskManagerController = require("./apis/controller/TaskController");
const logger = require('./utils/Logger');

const port = process.env.PORT || 5000; 

mongoose.connect(
  "mongodb+srv://tejasnbontadka:tejasnbontadka@cluster0-kcqsh.mongodb.net/test?retryWrites=true&w=majority"
);

// Using the required packages as middleware

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/task", taskManagerController);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
  console.log('info',`The server has started in port ${port}`);
});
