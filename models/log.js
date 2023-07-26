const { DataTypes } = require("sequelize");
const sequelize = require("../startup/db")();
const User = require("./user");

const Log = sequelize.define("logs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  action: {
    type: DataTypes.ENUM("login", "logout"), // Add the action field with possible values of "login" or "logout"
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

Log.belongsTo(User, { foreignKey: "userId", as: "user" });

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("table log added");
  } catch (error) {
    console.error(
      "An error occurred while synchronizing the table log:",
      error
    );
  }
})();

module.exports = Log;
