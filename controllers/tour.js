const fs = require("fs");
const Tour = require("../models/tour");

// exports.checkId = (req, res, next, val) => {
//   const id = val * 1;
//   if (id > tours.length - 1) {
//     return res.status(404).json({
//       status: "Fail",
//       message: "Invalid Id",
//     });
//   }
//   next();
// };
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: { requestedAt: req.requestTime, tour: newTour },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "failure",
      message: "Invalide data fields",
    });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(201).json({
      status: "success",
      data: { requestedAt: req.requestTime, tour },
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: "Invalide data fields",
    });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: { requestedAt: req.requestTime, tour },
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: "Invalide data fields",
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: "Invalide data fields",
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failure",
      message: "Invalide request",
    });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failure",
      message: "Invalide request",
    });
  }
};
