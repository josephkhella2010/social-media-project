/* // router.js or message.js (whichever file you use for routing)
const express = require("express");
const { User } = require("./databasa Schema Two/userSchema");
const { Friends } = require("./databasa Schema Two/friends");
const Message = require("./databasa Schema Two/message");
const router = express.Router();
const { Op } = require("sequelize");

// Send message
router.post("", async (req, res) => {
  const { senderId, recipientId, message } = req.body;
  try {
    // Check if both sender and recipient are valid users
    const sender = await User.findByPk(senderId);
    const recipient = await User.findByPk(recipientId);

    if (!sender || !recipient) {
      return res.status(404).send("Sender or Recipient not found.");
    }

    // Check if sender and recipient are friends
    const isFriend = await Friends.findOne({
      where: {
        userId: senderId,
        friendId: recipientId
      }
    });

    if (!isFriend) {
      return res
        .status(400)
        .json({ message: "You can only send messages to friends." });
    }

    // Create and save the new message
    const newMessage = await Message.create({
      senderId,
      recipientId,
      message
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      messageId: newMessage.id,
      senderId: newMessage.senderId,
      recipientId: newMessage.recipientId,
      messageText: newMessage.message
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error with sending the message" });
  }
});

// Get messages between two users
router.get("/:userId/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    // Check if the users are friends by matching userId and friend's friendId in Friends table
    const isFriend = await Friends.findOne({
      where: {
        userId: userId,
        friendId: friendId // Correctly match friendId, not name
      }
    });

    if (!isFriend) {
      return res
        .status(400)
        .json({ message: "You can only view messages with friends." });
    }

    // Get all messages between the users
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, recipientId: friendId },
          { senderId: friendId, recipientId: userId }
        ]
      },
      order: [["createdAt", "ASC"]] // Ensure messages are ordered by creation date
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving messages" });
  }
});

// Route for getting all messages (optional)
router.get("/all", async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [["createdAt", "DESC"]] // Sort by latest messages
    });
    res.status(201).json({ messages });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Error with get all request for message" });
  }
});

module.exports = router; */
// router.js or message.js (whichever file you use for routing)
const express = require("express");
const { User } = require("./databasa Schema Two/userSchema");
const { Friends } = require("./databasa Schema Two/friends");
const Message = require("./databasa Schema Two/message");
const router = express.Router();
const { Op } = require("sequelize");

// Send message
router.post("", async (req, res) => {
  const { senderId, recipientId, message } = req.body;
  try {
    // Check if both sender and recipient are valid users
    const sender = await User.findByPk(senderId);
    const recipient = await User.findByPk(recipientId);

    if (!sender || !recipient) {
      return res.status(404).send("Sender or Recipient not found.");
    }

    // Check if sender and recipient are friends
    const isFriend = await Friends.findOne({
      where: {
        userId: senderId,
        friendId: recipientId
      }
    });

    if (!isFriend) {
      return res
        .status(400)
        .json({ message: "You can only send messages to friends." });
    }

    // Create and save the new message
    const newMessage = await Message.create({
      senderId,
      recipientId,
      message
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      messageId: newMessage.id,
      senderId: newMessage.senderId,
      recipientId: newMessage.recipientId,
      messageText: newMessage.message
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error with sending the message" });
  }
});

// Get messages between two users
router.get("/:userId/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    // Check if users are friends in either direction
    const isFriend = await Friends.findOne({
      where: {
        [Op.or]: [
          { userId: userId, friendId: friendId },
          { userId: friendId, friendId: userId }
        ]
      }
    });

    if (!isFriend) {
      return res
        .status(400)
        .json({ message: "You can only view messages with friends." });
    }

    // Fetch messages with sender name
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, recipientId: friendId },
          { senderId: friendId, recipientId: userId }
        ]
      },
      include: [
        { model: User, as: "sender", attributes: ["firstName", "lastName"] }
      ],
      order: [["createdAt", "ASC"]]
    });

    const formattedMessages = messages.map((msg) => ({
      id: msg.id,
      senderId: msg.senderId,
      recipientId: msg.recipientId,
      senderName: `${msg.sender.firstName} ${msg.sender.lastName}`,
      message: msg.message,
      createdAt: msg.createdAt
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ message: "Error retrieving messages" });
  }
});

// Route for getting all messages (optional)
router.get("/all", async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [["createdAt", "DESC"]] // Sort by latest messages
    });
    res.status(201).json({ messages });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Error with get all request for message" });
  }
});

module.exports = router;
