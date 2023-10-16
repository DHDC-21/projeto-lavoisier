/*Modelagem:
		Serviço(
		PK	cod_serviço,
			descriçao,
			val_unitario
		)
*/

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