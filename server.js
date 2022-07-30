const mongoose = require("mongoose");
const seedDB = require("./seeds");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

// prefill the DB with some data
seedDB();

const DB = process.env.DATABASE_URL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB CONNECTION SUCCESSFUL!"));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
