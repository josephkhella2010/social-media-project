const { sequelize, User } = require("../databasa Schema Two/userSchema"); // Ensure correct path to userSchema
const { DataTypes } = require("sequelize"); // Import DataTypes for defining the model

// Define the Friends model
const Friends = sequelize.define(
  "Friends",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "Friends",
    timestamps: true
  }
);

// Define associations between User and Friends
Friends.belongsTo(User, { as: "user", foreignKey: "userId" });
Friends.belongsTo(User, { as: "friend", foreignKey: "friendId" });

User.hasMany(Friends, { as: "friends", foreignKey: "userId" });
User.hasMany(Friends, { as: "friendOf", foreignKey: "friendId" });
// Sync models
sequelize
  .sync({ force: false }) // Use `force: false` to avoid data loss during sync
  .then(() => console.log("✅ Database synced and Friends table created"))
  .catch((err) => console.error("🔥 Error syncing database:", err));

module.exports = { Friends };
