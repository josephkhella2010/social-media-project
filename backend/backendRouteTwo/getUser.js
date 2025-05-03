const express = require("express");
const router = express.Router();
router.get("", async (req, res) => {
  const { User } = require("./databasa Schema Two/userSchema");

  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "birthDay",
        "gender",
        "username",
        "password",
        "photoUrl",
        "createdAt"
      ]
    });
    res.status(201).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error with get request", error: error.message });
  }
});
module.exports = router;
