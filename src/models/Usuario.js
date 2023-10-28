/*Modelagem:
		Usuário(
		PK	cod_usuário,
		FK	cod_funcionário,
			senha,
			isADM,
		)
*/

const { DataTypes, Sequelize } = require('sequelize');
const database = require('../config/_connectionDB.js');
const Funcionario = require('./Funcionario.js');
require('dotenv').config();

const Usuario = database.define('Usuario', {
	//atributos
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	}
}, {
	//opções
});

Usuario.belongsTo(Funcionario);


module.exports = Usuario;