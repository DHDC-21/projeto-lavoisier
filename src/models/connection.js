const {Sequelize} = require("sequelize");

const connection = new Sequelize("teste", "root", "root", {
    host: "localhost",
    dialect: "mariadb"
});

try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

module.exports = connection;