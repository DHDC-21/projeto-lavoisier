
const { DataTypes } = require('sequelize');
const database = require('../config/_connectionDB.js');


const Empresa = database.define('Empresa',{
	razao_social:{
		type: DataTypes.STRING,
		allowNull: true,
	},
	cnpj:{
		type: DataTypes.CHAR(15),
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
},{
	tableName: 'Empresa'
});


module.exports = Empresa;