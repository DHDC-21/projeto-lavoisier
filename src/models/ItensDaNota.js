
const { DataTypes } = require('sequelize');
const database = require('../config/_connectionDB.js');

const Nota = require('./Nota');
const Servico = require('./Servico');


const ItensDaNota = database.define('ItensDaNota', {
	quantidade:{
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	subtotal:{
		type: DataTypes.FLOAT,
		allowNull: true,
	},
},{
	timestamps: false,
	tableName: 'ItensDaNota'
});



Nota.belongsToMany(Servico,{
	through:{
		model: ItensDaNota
	},
	foreignKey: 'NotaId',
	constraints: true
})

Servico.belongsToMany(Nota,{
	through:{
		model: ItensDaNota
	},
	foreignKey: 'ServicoId',
	constraints: true
})  

Nota.hasMany(ItensDaNota,{foreignKey:'NotaId'});
ItensDaNota.belongsTo(Nota,{foreignKey:'NotaId'});
Servico.hasMany(ItensDaNota,{foreignKey:'ServicoId'});
ItensDaNota.belongsTo(Servico,{foreignKey:'ServicoId'});



module.exports = ItensDaNota;