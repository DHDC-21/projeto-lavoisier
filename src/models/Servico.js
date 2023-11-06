// Revisão do dia 2023-11-03 com base na modelagem da pasta public/diagrams.

const DataTypes = require('sequelize');
const database = require('../config/_connectionDB.js');


const Servico = database.define('Servico',{
	descricao: {
		type: DataTypes.STRING,
		allowNull: false
	},
	valor_unitario: {
		type: DataTypes.FLOAT,
		allowNull: true
	},
});


module.exports = Servico;