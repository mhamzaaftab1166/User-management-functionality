const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db")(); // Adjust the path based on your actual project structure and location of the database connection

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isArchive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
