// Revisão do dia 2023-11-03 com base na modelagem da pasta public/diagrams.

const DataTypes = require('sequelize');
const database = require('../config/_connectionDB.js');

const Usuario = require('./Usuario.js');
const Cliente = require('./Cliente.js');

// const Servico = require('./Servico.js');
// const ItemDaNota = require('./ItemDaNota.js');


const NotaDeServico = database.define('NotaDeServico',{
	total: {
		type: DataTypes.DECIMAL,
		allowNull: true,
	},
	prazo: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	entrega: {
		type: DataTypes.DATEONLY,
		allowNull: true,
	}
});

NotaDeServico.belongsTo(Cliente);
NotaDeServico.belongsTo(Usuario);


module.exports = NotaDeServico;