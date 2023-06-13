// './models/User.js'

const { DataTypes } = require('sequelize');
const database = require('./config/connection');


const User = database.define('Usuario', {
  // atributos
  id: {
    type:  DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },

  nome: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  
  sobrenome: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  
  usuario: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  
  senha: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  
  endereco: {
    type: DataTypes.STRING(20),
    allowNull: false
  }, 
  
  dt_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }

},{
  // opções
});


module.exports = User;
