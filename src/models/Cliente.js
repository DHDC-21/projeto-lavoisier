
const { Sequelize, DataTypes } = require('sequelize');
const database = require('../config/_connectionDB.js');


const Cliente = database.define('Cliente',{
	razao_social:{
		type: DataTypes.STRING,
		allowNull: true,
	},
	cpf_cnpj:{
		type: DataTypes.CHAR(15),
		allowNull: true,
	},
	insc_municipal:{
		type: DataTypes.CHAR(20),
		allowNull: true,
	},
	endereco:{
		type: DataTypes.STRING,
		allowNull: true,
	},
	municipio:{
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	estado:{
		type: DataTypes.CHAR(2),
		allowNull: true,
	},
	email:{
		type: DataTypes.STRING,
		allowNull: true,
	}
},{
	tableName: 'Cliente'
});


module.exports = Cliente;