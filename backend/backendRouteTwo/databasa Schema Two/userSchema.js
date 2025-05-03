/* const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// SQLite database path
const dbPath = path.join(__dirname, "../users.db");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath
});

const User = sequelize.define(
  "User",
  {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    birthDay: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    // Add the optional URL field
    url: { type: DataTypes.STRING, allowNull: true }
  },
  {
    tableName: "Users",
    timestamps: true
  }
);

// Sync the database (force: true will drop existing tables and recreate them)
sequelize
  .sync({ force: true }) // ✅ Set `force: true` only to reset tables during development
  .then(() => {
    console.log("✅ Database and tables created!");
  })
  .catch((error) => {
    console.error("❌ Error syncing database:", error);
  });

module.exports = { sequelize, User };
 */

const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// SQLite database path
const dbPath = path.join(__dirname, "../users.db");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath
});

const User = sequelize.define(
  "User",
  {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    birthDay: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    photoUrl: { type: DataTypes.STRING, allowNull: true }
  },
  {
    tableName: "Users",
    timestamps: true
  }
);

// Sync the database (alter will only adjust the schema without deleting data)
sequelize
  .sync({ alter: false }) // Will update the table schema without deleting data
  .then(() => {
    console.log("✅ Database and tables updated!");
  })
  .catch((error) => {
    console.error("❌ Error syncing database:", error);
  });

module.exports = { sequelize, User };
