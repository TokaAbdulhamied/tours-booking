const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then((connection) => {
    console.log(connection);
    console.log("DB Connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "The tour must have a name"],
  },
  rating: { type: Number, default: 0, max: [5, "max rating is 5"] },
  price: {
    type: Number,
    unique: true,
    required: [true, "The tour must have a price"],
  },
});
const Tour = mongoose.model("Tour", tourSchema);
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
