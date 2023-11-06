// Revisão do dia 2023-11-03 com base na modelagem da pasta public/diagrams.

const DataTypes = require('sequelize');
const database = require('../config/_connectionDB.js');

const Pessoa = database.define('Pessoa', {
	nome: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [3, undefined]
		},
	},
	cpf: {
		type: DataTypes.CHAR(11),
		allowNull: false,
	},
	dt_nascimento: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	telefone: {
		type: DataTypes.STRING(20),
		allowNull: true,
	},

	// Endereço
	logradouro: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	n_casa: {
		type: DataTypes.STRING(10),
		allowNull: true,
	},
	bairro: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	cep: {
		type: DataTypes.CHAR(8),
		allowNull: true,
	},
	cidade: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
});


module.exports = Pessoa;