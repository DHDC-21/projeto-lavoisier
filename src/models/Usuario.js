
const { DataTypes } = require('sequelize');
const database = require('../config/_connectionDB.js');


const Usuario = database.define('Usuario',{
	email:{
		type: DataTypes.STRING,
		allowNull: true,
	},
	username:{
		type: DataTypes.STRING,
		allowNull: true,
	},
	password:{
		type: DataTypes.STRING,
		allowNull: true,
	},
	isAdmin:{
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	}
},{
	tableName: 'Usuario'
});


module.exports = Usuario;