const mongoose = require("mongoose");
const slugify = require("slugify");
const tourSchema = new mongoose.Schema(
  {
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
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});
// Document Middlewares
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true }); // this : document
  next();
});
tourSchema.post("save", function (doc, next) {
  console.log("doc slug", doc.slug);
  next();
});
// Query Middlewares
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } }); // this : query
  this.start = Date.now();
  next();
});
tourSchema.post(/^find/, function (doc, next) {
  console.log(`QUERY DUARATION ${Date.now() - this.start} in milliseconds`);
  next();
});
// Aggregation Middlewares
// tourSchema.pre("aggregate", function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } }); // this : aggregation object, this.pipeline: aggregation pipline array
//   this.start = Date.now();
//   next();
// });
// tourSchema.post("aggregate", function (doc, next) {
//   console.log(
//     `AGGREGATION DUARATION ${Date.now() - this.start} in milliseconds`
//   );
//   next();
// });
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
