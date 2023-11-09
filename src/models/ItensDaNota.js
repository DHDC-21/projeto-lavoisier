
const { DataTypes } = require('sequelize');
const database = require('../config/_connectionDB.js');

const Servico = require('./Servico.js');
const Nota = require('./Nota.js');



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


// Servico.belongsToMany(Nota, {through: 'ItensDaNota',});
// Nota.belongsToMany(Servico, {through: 'ItensDaNota',});


module.exports = ItensDaNota;