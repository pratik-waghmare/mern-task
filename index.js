const experss = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// const dotenv = require("dotenv");
// dotenv.config();

const userRoutes = require("./routes/user-routes.js");
const HttpError = require("./models/http-error.js");

const app = experss();

app.use(experss.json());
app.use(cors());

app.use("/api", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured" });
});

const URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(URL)
  .then(() =>
    app.listen(PORT, (err) => {
      console.log("Server running at " + PORT);
    })
  )
  .catch((err) => console.log(err));
