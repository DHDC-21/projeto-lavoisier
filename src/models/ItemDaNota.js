// Revisão do dia 2023-11-03 com base na modelagem da pasta public/diagrams.

const { Sequelize, DataTypes } = require('sequelize');
const database = require('../config/_connectionDB.js');

const Servico = require('./Servico.js');
const NotaDeServico = require('./NotaDeServico.js');


const ItemDaNota = database.define('ItemDaNota',{
	quantidade: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate:{
			isInt: true,
		}
	},
	observacao: {
		type: DataTypes.STRING,
		allowNull: true
	},
	subtotal: {
		type: DataTypes.DECIMAL,
		allowNull: true,
	}
});

ItemDaNota.belongsTo(NotaDeServico);
ItemDaNota.belongsTo(Servico);


module.exports = ItemDaNota;