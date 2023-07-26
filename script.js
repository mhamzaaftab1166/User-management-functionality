const User = require("./models/user");

(async () => {
  try {
    await User.sync({ force: true });
    console.log("User table created successfully!");
  } catch (error) {
    console.error("Error creating User table:", error);
  } finally {
    User.sequelize.close();
  }
})();
