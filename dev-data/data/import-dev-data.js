const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const Tour = require("../../models/tour");
dotenv.config({ path: `${process.cwd()}/config.env` });
console.log("path", `${process.cwd()}\config.env`);
const Tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);
console.log(process.env.PORT);
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

(async () => {
  try {
    await mongoose.connect(DB);
    console.log("DB Connected successfully");
    process.exit();
  } catch (error) {
    console.log(err);
  }
})();
const importData = async () => {
  try {
    await Tour.create(Tours);
    console.log("Data successfully loaded ....");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted ....");
  } catch (error) {
    console.log(error);
  }
};

console.log(process.argv);
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
