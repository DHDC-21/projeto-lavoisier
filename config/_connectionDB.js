// _connection.js

const { Sequelize } = require('sequelize');
require("dotenv").config();

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE
});

// Adicione um evento 'sync' para chamar o arquivo de setup após a sincronização
connection.sync({ force: false })
  .then(() => {
    console.log('Banco de dados recriado com sucesso.');
  })
  .catch(error => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  })
  

async () => {
  try {
    await connection.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
};



module.exports = connection;
