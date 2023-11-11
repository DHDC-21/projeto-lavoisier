
const { DataTypes, Sequelize } = require('sequelize');
const database = require('../config/_connectionDB.js');


const Servico = database.define('Servico',{
	descricao:{
		type: DataTypes.STRING,
		allowNull: true,
	},
	valor_unitario:{
		type: DataTypes.FLOAT,
		allowNull: true,
	}
},{
	tableName: 'Servico'
});



module.exports = Servico;