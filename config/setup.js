// setup.js

const bcrypt = require('bcrypt');
const Funcionario = require('../models/Funcionario.js');
const Usuario = require('../models/Usuario');

const gerarUserRoot = (async () => {
	// Sincronize os modelos
	await Funcionario.sync();
	await Usuario.sync();

	// Crie o funcionário padrão
	await Funcionario.create({
		id: "1",
		nome: "Usuario Padrao",
		cpf: "9999999999",
		dt_nascimento: "2002-02-10",
		logradouro: "Rua Arthur de Azevedo",
		n_casa: "157",
		bairro: "Jardim Patricia",
		cep: "13800100",
		cidade: "Mogi Mirim"
 	});


	// Crie o usuário padrão
	const senhaHash = await bcrypt.hash("senha123", 10);

	await Usuario.create({
		id: "1",
		username: "root",
		senha: senhaHash,
		isADM: true,
		FuncionarioId: funcionario.id
	});

	console.log("Usuario root criado com sucesso!");
});


module.exports = gerarUserRoot;