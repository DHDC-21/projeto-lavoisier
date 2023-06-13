// './src/models/Client.js'

const { DataTypes } = require('sequelize');
const database = require('./config/connection');

const Client = database.define('Cliente',{
    // atributos
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    nome: {
        type: DataTypes.STRING(45),
        allowNull: false
    },

    endereco: {
        type: DataTypes.STRING(45),
        allowNull: false
    },

    telefone: {
        type: DataTypes.STRING(11),
        allowNull: false
    },

    CPF: {
        type: DataTypes.STRING(11),
        allowNull: false
    }
    
},{
    // opções
});


module.exports = Client;