const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "The tour must have a name"],
  },
  rating: { type: Number, default: 0, max: [5, "max rating is 5"] },
  price: {
    type: Number,
    unique: false,
    required: [true, "The tour must have a price"],
  },
});
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
