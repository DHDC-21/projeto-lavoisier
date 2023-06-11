const {Sequelize} = require("sequelize");

const connection = new Sequelize("nodejs", "phpmyadmin", "rpi", {
    host: "192.168.68.14",
    dialect: "mariadb"
});

try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

module.exports = connection;