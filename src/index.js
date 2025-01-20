const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

// the below middleware will deal with the form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.1
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", authRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
