const fs = require("fs");
const Tour = require("../models/tour");
const { query } = require("express");
const APIFeatures = require("../utils/apisFeatures");

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
exports.aliasTopTours = async (req, res, next) => {
  try {
    req.query.limit = 5;
    req.query.sort = "-ratingsAverage,price ";
    req.query.fields = "name, ratingsAverage, price, difficulty,summary ";
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failure",
      message: "Invalide request",
    });
  }
  next();
};
exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .paginate()
      .limitFeilds()
      .sort();
    const tours = await features.query;
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

exports.getToursStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: "$difficulty",
          numTours: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          avgRating: { $avg: "$ratingsAverage" },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats,
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

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      { $unwind: "$startDates" },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numTours: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      { $addFields: { month: "$_id" } },
      { $project: { _id: 0 } },
      { $sort: { numTours: -1 } },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        plan,
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
