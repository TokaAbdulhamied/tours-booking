const fs = require("fs");
const Tour = require("../models/tour");
const { query } = require("express");

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
    console.log(req.query);
    let queryObj = { ...req.query };
    let excludedFeilds = ["limit", "sort", "page", "fields"];
    excludedFeilds.forEach((e) => delete queryObj[e]);
    console.log("queryObj", queryObj);
    let query = Tour.find(queryObj);
    // sorting
    if (req.query.sort) {
      const sortedBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortedBy);
    } else {
      query = query.sort("-createdAt");
    }
    // spicify fields
    if (req.query.fields) {
      const selectedBy = req.query.fields.split(",").join(" ");
      query = query.select(selectedBy);
    } else {
      query = query.select("");
    }
    // pagination
    const limit = req.query.limit * 1 || 100;
    const page = req.query.page * 1 || 1;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const count = await Tour.countDocuments();
      if (skip >= count) {
        throw new Error("this page dosn't exist");
      }
    }
    const tours = await query;
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
