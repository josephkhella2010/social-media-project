/* const express = require("express");
const { Friends } = require("./databasa Schema Two/friends");
const { User } = require("./databasa Schema Two/userSchema");
const authenticateToken = require("../Middleware/authMiddleware");
const router = express.Router();

// ✅ Add Friend
router.post("/addFriend", async (req, res) => {
  try {
    const { userId, friendId, name, url } = req.body;

    // Log incoming data for debugging
    console.log(
      `Received data: userId = ${userId}, friendId = ${friendId}, name = ${name}, url = ${url}`
    );

    if (!userId || !friendId) {
      return res
        .status(400)
        .json({ message: "Both userId and friendId are required" });
    }

    // Check if the users exist in the database
    const user = await User.findByPk(userId);
    const friend = await User.findByPk(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found" });
    }

    // Check if friendship already exists
    const existingFriendship = await Friends.findOne({
      where: { userId, friendId }
    });

    if (existingFriendship) {
      return res.status(400).json({ message: "Already friends" });
    }

    // Create the friendship in both directions
    await Friends.create({ userId, friendId, name, url });
    await Friends.create({ userId: friendId, friendId: userId, name, url });

    // Fetch the details of the user and the friend
    const userDetails = await User.findByPk(userId);
    const friendDetails = await User.findByPk(friendId);

    // Send the response including both user's details and the friend added message
    return res.status(201).json({
      message: "Friend added successfully",
      user: {
        id: userDetails.id,
        username: userDetails.username,
        email: userDetails.email
      },
      friend: {
        id: friendDetails.id,
        username: friendDetails.username,
        email: friendDetails.email
      }
    });
  } catch (error) {
    console.error("🔥 Error adding friend:", error.message);
    res
      .status(500)
      .json({ error: "Failed to add friend", details: error.message });
  }
});

// ✅ Get Friends List
router.get("/friends/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all friends for the user
    const friendsList = await Friends.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          as: "friend", // Use the alias 'friend' to include the friend's details
          foreignKey: "friendId",
          attributes: ["id", "username", "email"] // Choose the fields you want to return
        }
      ]
    });

    if (friendsList.length === 0) {
      return res.status(404).json({ message: "No friends found." });
    }

    // Send response with friends' details
    const friendsDetails = friendsList.map((friendship) => {
      return {
        id: friendship.friend.id,
        name: friendship.friend.username,
        url: friendship.url
      };
    });

    res.status(200).json({ friends: friendsDetails });
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ message: "Error fetching friends" });
  }
});

module.exports = router; */
const express = require("express");
const { Friends } = require("./databasa Schema Two/friends");
const { User } = require("./databasa Schema Two/userSchema");
const authenticateToken = require("../Middleware/authMiddleware");
const router = express.Router();

// ✅ Add Friend (Bi-directional)
router.post("/addFriend", async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    // Check if the user and the friend exist
    const user = await User.findByPk(userId);
    const friend = await User.findByPk(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found" });
    }

    // Check if the friendship already exists
    const existingFriendship = await Friends.findOne({
      where: { userId, friendId }
    });

    if (existingFriendship) {
      return res.status(400).json({ message: "Already friends" });
    }

    // Create the friendship in both directions (user -> friend and friend -> user)
    await Friends.create({ userId, friendId });
    await Friends.create({ userId: friendId, friendId: userId });

    // Fetch the details of the user and the friend
    const userDetails = await User.findByPk(userId);
    const friendDetails = await User.findByPk(friendId);

    return res.status(201).json({
      message: "Friend added successfully",
      user: {
        id: userDetails.id,
        username: userDetails.username,
        email: userDetails.email,
        photoUrl: userDetails.photoUrl // Include photo URL
      },
      friend: {
        id: friendDetails.id,
        username: friendDetails.username,
        email: friendDetails.email,
        photoUrl: friendDetails.photoUrl
      }
    });
  } catch (error) {
    console.error("🔥 Error adding friend:", error.message);
    res
      .status(500)
      .json({ error: "Failed to add friend", details: error.message });
  }
});

// ✅ Get Friends List (including details like name, email, photo URL)
// Get all friends of a user
router.get("/friends/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const friendsList = await Friends.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          as: "friend", // Use the correct alias
          attributes: [
            "id",
            "username",
            "email",
            "photoUrl",
            "firstName",
            "lastName",
            "gender",
            "birthDay"
          ]
        }
      ]
    });

    if (friendsList.length === 0) {
      return res.status(404).json({ message: "No friends found." });
    }

    const friendsDetails = friendsList.map((friendship) => {
      return {
        id: friendship.friend.id,
        name: friendship.friend.username,
        photoUrl: friendship.friend.photoUrl,
        email: friendship.friend.email,
        firstName: friendship.friend.firstName,
        lastName: friendship.friend.lastName,
        gender: friendship.friend.gender,
        birthDay: friendship.friend.birthDay
      };
    });

    res.status(200).json({ friends: friendsDetails });
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ message: "Error fetching friends" });
  }
});

module.exports = router;
