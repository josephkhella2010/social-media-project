const express = require("express");
const router = express.Router();
const { User } = require("./databasa Schema Two/userSchema");
const authenticateToken = require("../Middleware/authMiddleware");

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.destroy({ where: { id: id } });

    res.status(200).json({ msg: "Successfully deleted user" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ msg: "Error with delete user request" });
  }
});

module.exports = router;
