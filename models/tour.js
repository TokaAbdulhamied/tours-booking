const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true, // remove white spaces front string's end
    required: [true, "The tour must have a name"],
    maxlength: [40, "A tour name must have less or equal then 40 characters"],
    minlength: [10, "A tour name must have more or equal then 10 characters"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    unique: false,
    required: [true, "The tour must have a price"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: true, // always included in the results
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  slug: String,
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
    enum: {
      // enum validator checks if the value given in the array.
      values: ["easy", "medium", "difficult"],
      message: "Difficulty is either: easy, medium, difficult",
    },
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        // this only points to current doc on NEW document creation
        return val < this.price;
      },
      message: "Discount price ({VALUE}) should be below regular price",
    },
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have a description"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
