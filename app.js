const express = require("express");
const cors = require("cors");

const app = express();

const userRouter = require("./routes/userRoutes");

app.use(cors());

app.use(express.json());

app.use("/users", userRouter);

module.exports = app;
