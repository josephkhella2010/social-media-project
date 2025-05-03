const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("./userSchema");
const { User } = require("../databasa Schema Two/userSchema");
const Message = sequelize.define(
  "Message",
  {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: "Messages",
    timestamps: true
  }
);
Message.belongsTo(User, { foreignKey: "senderId", as: "sender" }); // Fetch sender details
User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("✅ Messages table synced!");
  })
  .catch((error) => {
    console.error("❌ Error syncing messages table:", error);
  });

module.exports = Message;
