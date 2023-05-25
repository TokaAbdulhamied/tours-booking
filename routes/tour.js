const express = require("express");
const router = express.Router();
const toursController = require("../controllers/tour");

router
  .route("/")
  .get(toursController.getAllTours)
  .post(toursController.createTour);
router
  .route("/top-five-tours")
  .get(toursController.aliasTopTours, toursController.getAllTours);

router.route("/stats").get(toursController.getToursStats);
router.route("/monthly-plan/:year").get(toursController.getMonthlyPlan);

router
  .route("/:id")
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

module.exports = router;
