/*Modelagem:
		Nota_de_Serviço(
		PK	cod_nota,
		FK	cod_usuário,
		FK	cod_cliente,
			val_total,
			dt_entrega,
			prazo
		)
*/

const DataTypes = require('sequelize');
const database = require('./_connection.js');

const Usuario = require('./Usuario.js');
const Cliente = require('./Cliente.js');

const NotaServico = database.define('NotaServico',{
	total: {
		type: DataTypes.FLOAT,
		allowNull: true
	},
	prazo: {
		type: DataTypes.INTEGER,
		allowNull: true
	}
});

NotaServico.belongsTo(Usuario);
NotaServico.belongsTo(Cliente);

module.exports = NotaServico;