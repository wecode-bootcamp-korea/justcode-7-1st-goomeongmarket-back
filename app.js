const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const router = require("./routes");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );
  app.use(morgan("combined"));
  app.use(router);

  return app;
};

module.exports = { createApp };
