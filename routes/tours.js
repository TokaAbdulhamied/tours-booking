const express = require("express");
const router = express.Router();
const toursController = require("../controllers/tours");
router
  .route("/")
  .get(toursController.getTours)
  .post(toursController.createTour);
router.route("/:id").get(toursController.getTour);

module.exports = router;
