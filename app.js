const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

// MIDDLEWARES
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ROUTE HANDLERS
const createTour = (req, res) => {
  const newTour = Object.assign(
    { id: tours[tours.length - 1].id + 1 },
    req.body
  );
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: { requestedAt: req.requestTime, tour: newTour },
      });
    }
  );
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length - 1) {
    res.status(404).json({
      status: "Fail",
      message: "Invalid Id",
    });
  } else {
    const tour = tours.find((tour) => tour.id === id);
    res.status(200).json({
      status: "success",
      data: { tour },
    });
  }
};
const getTours = (req, res) => {
  res.status(200).json({
    status: "success",
    data: { tours },
  });
};
// ROUTES

// app.post("/api/tours", createTour);
// app.get("/api/tours/:id?", getTour);
// app.get("/api/tours", getTours);

app.route("/api/tours").get(getTours).post(createTour);
app.route("/api/tours/:id").get(getTour);
//START SERVER
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
