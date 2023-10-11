/*Modelagem:
		Item(
		FK	cod_serviço,
		FK	cod_nota,
			quantidade,
			sub_total,
			observação
		)
*/

const { Sequelize, DataTypes } = require('sequelize');
const database = require('./_connection');

const Servico = require('./Servico.js');
const NotaServico = require('./NotaServico.js');

const Item = database.define('Item',{
	quantidade: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	observacao: {
		type: DataTypes.STRING,
		allowNull: true
	}
});

Item.belongsTo(Servico);
Item.belongsTo(NotaServico);

module.exports = Item;