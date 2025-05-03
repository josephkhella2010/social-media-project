const express = require("express");
const router = express.Router();
const { User } = require("./databasa Schema Two/userSchema");
const authenticateToken = require("../Middleware/authMiddleware");

// ✅ Update user details
router.put("/userDetails/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, gender, email } = req.body;

  try {
    const findUser = await User.findOne({ where: { id } });
    if (!findUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (firstName) findUser.firstName = firstName;
    if (lastName) findUser.lastName = lastName;
    if (gender) findUser.gender = gender;
    if (email) findUser.email = email;

    await findUser.save();

    res.status(200).json(findUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ msg: "Error updating user details" });
  }
});

module.exports = router;
