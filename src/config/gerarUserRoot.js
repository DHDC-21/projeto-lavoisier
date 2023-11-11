
const bcrypt = require('bcrypt')

const Usuario = require('../models/Usuario.js');

async function gerarUserRoot(){
	// Criptografando a senha
	const  salt = await bcrypt.genSalt(12);
	const passwordHash = await bcrypt.hash('admin', salt);
	await Usuario.create({
		email: 'admin@email.com',
		username: 'admin',
		password: passwordHash,
		isAdmin: true,
	})
}

module.exports = {gerarUserRoot};
