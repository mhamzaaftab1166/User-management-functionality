const { Sequelize } = require("sequelize");
module.exports = () => {
  const sequelize = new Sequelize("management", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });
  return sequelize;
};
