const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const { sequelize } = require("./userSchema");

const Media = sequelize.define(
  "Media",
  {
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filetype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "Media",
    timestamps: true
  }
);

module.exports = { Media };
