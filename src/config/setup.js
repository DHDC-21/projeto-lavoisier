
const bcrypt = require('bcrypt')

const Usuario = require('../models/Usuario.js');

async function gerarUserRoot(){
	// Criptografando a senha
	const  salt = await bcrypt.genSalt(12);
	const passwordHash = await bcrypt.hash('senha123', salt);
	await Usuario.create({
		email: 'crislu.webapp@email.com',
		username: 'Admin',
		password: passwordHash,
		isAdmin: true,
	})
}

module.exports = {
	gerarUserRoot,
};