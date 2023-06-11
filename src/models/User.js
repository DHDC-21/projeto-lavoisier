// models/User.js

const { DataTypes } = require('sequelize');
const connection = require('./connection');


const User = connection.define('Usuario', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
