
const { DataTypes } = require('sequelize');
const database = require('../config/_connectionDB.js');

const Cliente = require('./Cliente.js');
const Empresa = require('./Empresa.js');
const Usuario = require('./Usuario.js');


const Nota = database.define('Nota',{
	num_nf:{
		type: DataTypes.STRING,
		allowNull: true,
	},
	dt_hora:{
		type: DataTypes.DATE,
		allowNull: true,
	},
	cod_verifcacao:{
		type: DataTypes.STRING,
		allowNull: true,
	},
	inss:{
		type: DataTypes.FLOAT,
		allowNull: true,
	},
	aliquota:{
		type: DataTypes.FLOAT,
		allowNull: true,
	},
	valor_total:{
		type: DataTypes.FLOAT,
		allowNull: true,
	},
	observacao:{
		type: DataTypes.STRING,
		allowNull: true,
	},
	prazo:{
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	entrega:{
		type: DataTypes.DATEONLY,
		allowNull: true,
	},
},{
	tableName: 'Nota'
});

Nota.belongsTo(Cliente);
Nota.belongsTo(Empresa);
Nota.belongsTo(Usuario);


module.exports = Nota;