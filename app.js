const express = require("express");
const morgan = require("morgan");
const app = express();
const toursRouter = require("./routes/tours");
const port = 3000;

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/tours", toursRouter);

//START SERVER
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
