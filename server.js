const express = require('express');

const server = express();

const validateUser = require("./users/userRouter.js");
const validateUserId = require("./users/userRouter.js");

server.use(express.json());
server.use(logger);
server.use(validateUserId);
server.use("/", validateUser);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl} at ${Date.now()}`)
  next();
}

module.exports = server;
