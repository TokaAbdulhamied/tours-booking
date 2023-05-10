const express = require("express");
const morgan = require("morgan");
const app = express();
const toursRouter = require("./routes/tours");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/api/tours", toursRouter);

module.exports = app;
