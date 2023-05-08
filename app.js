const express = require("express");
const morgan = require("morgan");
const app = express();
const toursRouter = require("./routes/tours");

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/api/tours", toursRouter);

module.exports = app;
