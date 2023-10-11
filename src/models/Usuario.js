/*Modelagem:
		Usuário(
		PK	cod_usuário,
		FK	cod_funcionário,
			senha,
			isADM,
		)
*/

const { DataTypes, Sequelize } = require('sequelize');
const database = require('./_connection.js');
const Funcionario = require('./Funcionario.js');

const Usuario = database.define('Usuario', {
	//atributos
	senha: {
		type: DataTypes.STRING,
		allowNull: false
	},
	isADM: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	}
}, {
	//opções
});

Usuario.belongsTo(Funcionario);

module.exports = Usuario;