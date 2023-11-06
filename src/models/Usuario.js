
const { DataTypes, Sequelize } = require('sequelize');
const database = require('../config/_connectionDB.js');

// const Funcionario = require('./Funcionario.js');

const Usuario = database.define('Usuario', {
	email: {
		type: DataTypes.STRING,
		allowNull: true,
		validate: {
			isEmail: true,
		},
	},
	username: {
		type: DataTypes.STRING(50),
		allowNull: false,
		validate: {
			len: [5, 50],
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

// Apesar da relacao 1:1 nao e possivel ambos os bancos terem chaves estrangeiras um do outro entao apenas Funcionario tera essa associacao
// Usuario.belongsTo(Funcionario, { unique: true });


module.exports = Usuario;
