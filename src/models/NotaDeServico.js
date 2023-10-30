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
const database = require('../config/_connectionDB.js');

const Cliente = require('./Cliente.js');
const Servico = require('./Servico.js');

const NotaDeServico = database.define('NotaDeServico',{
	quantidade: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	prazo: {
		type: DataTypes.INTEGER,
		allowNull: true
	}
});

NotaDeServico.belongsTo(Cliente);
NotaDeServico.belongsTo(Servico);


module.exports = NotaDeServico;