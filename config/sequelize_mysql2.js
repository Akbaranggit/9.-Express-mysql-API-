const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "eduwork-crud-sequelize-mysql2",
  host: "localhost",
  username: "root",
  password: "root",
  dialect: "mysql",
});

//cek koneksi dengan iife
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
// node config\sequelize_mysql2

module.exports = sequelize;
