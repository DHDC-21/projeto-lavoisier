/*Modelagem:
	Funcionário(
	PK	cod_funcionário,
		nome,
		cpf,
		dt_nascimento,
		logradouro,
		num_casa,
		bairro,
		cep,
		cidade,
	)
*/

const DataTypes = require('sequelize');
const database = require('../database/database.js');

const Funcionario = database.define('Funcionario', {
	//atributos
	nome: {
		type: DataTypes.STRING,
		allowNull: false
	},
	cpf: {
		type: DataTypes.STRING,
		allowNull: false
	},
	dt_nascimento: {
		type: DataTypes.DATEONLY,
		allowNull: false
	},
	//endereço
	logradouro: {
		type: DataTypes.STRING,
		allowNull: true
	},
	n_casa: {
		type: DataTypes.STRING,
		allowNull: true
	},
	bairro: {
		type: DataTypes.STRING,
		allowNull: true
	},
	cep: {
		type: DataTypes.STRING,
		allowNull: true
	},
	cidade: {
		type: DataTypes.STRING,
		allowNull: true
	}	
}, {
	//opções
});


module.exports = Funcionario;