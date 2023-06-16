
const { Sequelize } = require('sequelize');
require("dotenv").config();

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE
});


(async () => {
  try {
    await connection.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
})();

module.exports = connection;
