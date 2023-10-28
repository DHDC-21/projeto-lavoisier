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

async function recriarBancoDeDados() {
	try {
	  // Isso recriará o banco de dados, eliminando todas as tabelas existentes
	  await connection.sync({ force: true });
	  console.log('Banco de dados recriado com sucesso.');
	} catch (error) {
	  console.error('Erro ao recriar o banco de dados:', error);
	}
  }

async function conectarAoBancoDeDados() {
  try {
    await connection.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    // Sincronizar o modelo com o banco de dados (opcional)
    await connection.sync();
    console.log('Modelo sincronizado com o banco de dados.');

	if(process.env.DB_FORCE == 'true'){
		await recriarBancoDeDados();
	}

  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
}

// Invocar a função para conectar ao banco de dados
conectarAoBancoDeDados();

// Exportar a conexão para uso em outros lugares
module.exports = connection;
