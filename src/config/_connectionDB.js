// _connection.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE
});


async function recriarBancoDeDados(){
	// Recriar o modelo e o banco de dados (forçar a recriação)
	await connection.sync({ force: true });
	console.log('Modelo e banco de dados recriados com sucesso.');
}

async function conectarAoBancoDeDados() {
  try {
	if(process.env.DB_FORCE == 'true') recriarBancoDeDados();
    await connection.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
}

// Invocar a função para conectar ao banco de dados
conectarAoBancoDeDados();


// Exportar a conexão para uso em outros lugares
module.exports = connection;
