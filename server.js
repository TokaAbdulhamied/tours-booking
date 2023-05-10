const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

(async () => {
  try {
    await mongoose.connect(DB);
    console.log("DB Connected successfully");
  } catch (error) {
    console.log(err);
  }
})();

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
