const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.createTour = (req, res) => {
  const newTour = Object.assign(
    { id: tours[tours.length - 1].id + 1 },
    req.body
  );
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: { requestedAt: req.requestTime, tour: newTour },
      });
    }
  );
};

exports.getTour = (req, res) => {
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

exports.getTours = (req, res) => {
  res.status(200).json({
    status: "success",
    data: { tours },
  });
};
