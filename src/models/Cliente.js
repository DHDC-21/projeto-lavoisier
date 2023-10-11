/* Modelagem:
		Cliente(
		PK	cod_cliente,
			cpf,
			telefone,
			logradouro,
			num_casa,
			bairro,
			cep,
			cidade
		)
*/

const DataTypes = require('sequelize');
const database = require('../database/database.js');

const Cliente = database.define('Cliente', {
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


module.exports = Cliente;