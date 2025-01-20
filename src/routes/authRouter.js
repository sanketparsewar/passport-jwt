const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

// middelware
require("../middleware/authentication");

router.post("/register", async function (req, res) {
  try {
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    await user.save().then((user) => {
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          username: user.username,
        },
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to register user",
      error: err.message,
    });
  }
});

router.post("/login", async function (req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = {
      _id: user._id,
      username: user.username,
    };

    // generate token
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: "Bearer " + token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

// protected route
router.get("/protected", passport.authenticate("jwt", { session: false }),function(req,res){
  return res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
    } 
  });
});

module.exports = router;
