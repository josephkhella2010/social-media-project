const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("./databasa Schema Two/userSchema");

const JWT_SECRET = "mySuperSecretKey123!@#";
const JWT_EXPIRES_IN = "7d";

router.post("", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    const findUser = await User.findOne({ where: { username } });

    if (!findUser) {
      return res
        .status(404)
        .json({ msg: "Username does not exist. Please register first." });
    }

    if (findUser.password !== password) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    // ✅ Create JWT Token
    const token = jwt.sign(
      { id: findUser.id, username: findUser.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      msg: "Login successful",
      token, // ✅ Send token in response
      user: {
        id: findUser.id,
        username: findUser.username,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        birthDay: findUser.birthDay,
        gender: findUser.gender,
        email: findUser.email,
        photoUrl: findUser.photoUrl
      }
    });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res
      .status(500)
      .json({ msg: "Error with login request", error: error.message });
  }
});

module.exports = router;
