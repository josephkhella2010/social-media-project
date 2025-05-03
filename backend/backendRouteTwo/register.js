const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("./databasa Schema Two/userSchema");

// POST route for user registration
router.post("", async (req, res) => {
  const {
    firstName,
    lastName,
    birthDay,
    gender,
    username,
    password,
    email,
    photoUrl
  } = req.body;

  try {
    // Check for required fields
    if (
      !firstName ||
      !lastName ||
      !birthDay ||
      !gender ||
      !username ||
      !password ||
      !email
    ) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ msg: "Username already taken" });
    }

    // Create a new user in the database
    const newUser = await User.create({
      firstName,
      lastName,
      birthDay,
      gender,
      username,
      password,
      email,
      photoUrl
    });

    res.status(201).json({
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        birthDay: newUser.birthDay,
        gender: newUser.gender,
        password: newUser.password,
        email: newUser.email,
        photoUrl: newUser.photoUrl
      }
    });
  } catch (error) {
    console.error("Error with register post request:", error);
    res.status(500).json({
      msg: "Error with register post request",
      error: error.message
    });
  }
});

module.exports = router;
