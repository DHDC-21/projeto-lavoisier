// './src/models/config/connections.js'

const { Sequelize } = require('sequelize');

const connection = new Sequelize(
  "node",
  "dhdc-21",
  "senha123", {
    host: "192.168.68.14",
    dialect: "mariadb"
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