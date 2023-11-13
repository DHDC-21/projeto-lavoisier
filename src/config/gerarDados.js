
const Cliente = require('../models/Cliente.js');
const Servico = require('../models/Servico.js');
const Empresa = require('../models/Empresa.js');
const Nota = require('../models/Nota.js');
const ItensDaNota = require('../models/ItensDaNota.js');


async function gerarClientes(){
	console.log('Criando clientes...');
	Cliente.afterSync(async()=>{
		await Cliente.create({
			razao_social: 	'Cliente_01',
			cpf_cnpj: 		'123123123',
			insc_municipal: '0123456789',
			endereco:		'rua, casa, bairro',
			municipio:		'Mogi Mirim',
			estado:			'SP',
			email:			'cliente@email.com',
		});

		await Cliente.create({
			razao_social: 	'Cliente_02',
			cpf_cnpj: 		'123123123',
			insc_municipal: '0123456789',
			endereco:		'rua, casa, bairro',
			municipio:		'Mogi Mirim',
			estado:			'SP',
			email:			'cliente@email.com',
		});
	
		await Cliente.create({
			razao_social: 	'Cliente_03',
			cpf_cnpj: 		'123123123',
			insc_municipal: '0123456789',
			endereco:		'rua, casa, bairro',
			municipio:		'Mogi Mirim',
			estado:			'SP',
			email:			'cliente@email.com',
		});
	})
}


async function gerarServicos(){
	Servico.afterSync(async()=>{
		await Servico.create({
			descricao: 		'Desenvolvimento Full-stack',
			valor_unitario: '4812.21'
		})
		await Servico.create({
			descricao: 		'Desenvolvimento Back-end',
			valor_unitario: '2468.86'
		})
		await Servico.create({
			descricao: 		'Desenvolvimento Front-end',
			valor_unitario: '1357.75'
		})
	})
}


async function gerarEmpresa(){
	Empresa.afterSync(async()=>{
		await Empresa.create({
			razao_social:	'Laboratório Crislu',
			cnpj:			'01234567891011',
			endereco:		'Rua Fatec Arthur de Azevedo',
			municipio:		'Mogi Mirim',
			estado:			'SP',
		})
	})
}

async function gerarNota(){

}


module.exports = {
	gerarClientes,
	gerarServicos,
	gerarEmpresa,
	gerarNota,
};