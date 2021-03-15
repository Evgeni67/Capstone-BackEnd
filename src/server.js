const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} = require("./utilities/errorHandling");

const profileRouter = require("./services/profiles");

const server = express();
const port = process.env.PORT || 3002;

server.use(cors());
server.use(express.json());

server.use("/profile", profileRouter);

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("The server's power level is over ", port);
    })
  );
