const DataTypes = require('sequelize');
const database = require('../config/_connectionDB.js');

const Pessoa = require('./Pessoa.js');
const Usuario = require('./Usuario.js');

const Funcionario = database.define('Funcionario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

Funcionario.belongsTo(Pessoa, {unique:true});

Funcionario.belongsTo(Usuario, { unique: true });


module.exports = Funcionario;
