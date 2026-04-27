const express = require("express");
const router = express.Router();
const User = require("./User");

// Register
router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    res.send("Register Error");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });

    console.log("FOUND USER:", user);

    if (user) {
      res.send("Login Successful");
    } else {
      res.send("Login Error");
    }

  } catch (error) {
    console.log(error);
    res.send("Login Error");
  }
});

module.exports = router;
