// Revisão do dia 2023-11-03 com base na modelagem da pasta public/diagrams.

const DataTypes = require('sequelize');
const database = require('../config/_connectionDB.js');

const Pessoa = require('./Pessoa.js');


const Cliente = database.define('Cliente', {});
Cliente.belongsTo(Pessoa, {
	unique: true,
});


module.exports = Cliente;