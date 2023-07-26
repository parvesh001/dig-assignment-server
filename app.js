const express = require("express");
const cors = require("cors");

const app = express();

const userRouter = require("./routes/userRoutes");
const errorHandlerController = require("./controllers/errorHandlerController");

app.use(cors());

app.use(express.json());

app.use("/users", userRouter);

app.use(errorHandlerController);

module.exports = app;
