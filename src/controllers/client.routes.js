
const express = require('express');
const router = express.Router();


const Cliente = require('../models/Cliente.js');
const Pessoa = require('../models/Pessoa.js');

const NotaDeServico = require('../models/NotaDeServico.js');
const ItemDaNota = require('../models/ItemDaNota.js');
const Servico = require('../models/Servico.js');


// INDEX
router
.get("/", async (req,res)=>{
	try {
		// Buscar todos os clientes
    	const clientes = await Cliente.findAll({include: [Pessoa]});

		// Renderiza a tela com o registro geral de clientes
		res.render('clientes/index',{title:'CONTROLE DE CLIENTES', clientes});

  	} catch (error) {
		console.log(error)
    	res.render('error', {msg:'erro na tela clientes', router:'/home'})
	}
});


// CREATE
router
.get("/create", (req,res)=>{
	const cliente = {Pessoa:{}};
	res.render('clientes/form',{title:'Cadastro de Clientes', cliente})
})
.post("/create", async (req,res)=>{
	const { inputNome,
			inputCPF,
			inputDtNascimento,
			inputLogradouro,
			inputNCasa,
			inputBairro,
			inputCEP,
			inputCidade,
			inputTelefone
		} = req.body;

	try{
		const novaPessoa = await Pessoa.create({
			nome: inputNome,
			cpf:  inputCPF,
			dt_nascimento: inputDtNascimento,
			telefone: inputTelefone,
			logradouro: inputLogradouro,
			n_casa: inputNCasa,
			bairro: inputBairro,
			cep: inputCEP,
			cidade: inputCidade,
		});

		const novoCliente = await Cliente.create({
			PessoaId: novaPessoa.id
		});

		console.log('Novo cliente! ', novoCliente, novaPessoa);
		
    	res.redirect('/clientes');

	}  catch (error){
		console.log(error);
		res.render('error',{msg:'Erro ao cadastrar cliente.', router:'/clientes'});
	}
});


// READ
router.get("/read/:id", async (req, res) => {
    const codigo = req.params.id;
	try{
		const cliente = await Cliente.findOne({
			include:[Pessoa],
			where:{id:codigo}
		});
		/*
		const itens = await ItemDaNota.findAll({
			include: [
				NotaDeServico,
				Servico,
			],
			where: {
			  '$NotaDeServico.ClientId$': codigo
			}
		  });
		  */
		
		res.render('clientes/profile',{title:'Ficha do Cliente', cliente, itens});
		
	} catch (error){
		console.log('ERRO!\n',error);
		res.render('error',{msg:'Cliente nao encontrado!', router:'/clientes'})
	}
});





// UPDATE
router
.get("/update/:id", async (req,res) => {
	const codigo = req.params.id;
	try {
		const cliente = await Cliente.findOne({
			include: [Pessoa],
			where:{id:codigo}
		});	
		res.render('clientes/form',{title:'Formulario de Atualização', cliente});
	} catch (error) {
		console.log(error);
		res.render('erro',{msg:'Cliente nao encontrado!'});
	}
})
.post('/update/:id', async (req, res) => {
	const codigo = req.params.id;
	const {
		inputNome,
		inputCPF,
		inputDtNascimento,
		inputLogradouro,
		inputNCasa,
		inputBairro,
		inputCEP,
		inputCidade,
		inputTelefone
	} = req.body;

	try {
		const cliente = await Cliente.findOne({include:[Pessoa],where:{id:codigo}});
		
				
		const pessoa = await Pessoa.update({
			nome: inputNome,
			cpf: inputCPF,
			dt_nascimento: inputDtNascimento,
			logradouro: inputLogradouro,
			n_casa: inputNCasa,
			bairro: inputBairro,
			cep: inputCEP,
			cidade: inputCidade,
			telefone: inputTelefone
		},{
			where:{id:cliente.PessoaId}
		});
		
		console.log('Cliente atualizado! ',cliente,pessoa);
		res.redirect('/clientes');

	} catch (error) {
		console.log(error);
		res.render('error',{msg:'Erro o atualizar cliente.', router:'/clientes'});
	}

})


// DELETE
router
.get("/delete/:id", async (req,res)=>{
	const codigo = req.params.id;	// Pegando o código do cliente pelo parametro id
	try {
		const cliente = await Cliente.findOne({include:[Pessoa],where:{id:codigo}});
		
		await Cliente.destroy({where:{id:cliente.id}});

		const pessoa = await Pessoa.destroy({where:{id:cliente.PessoaId}});
		
		console.log('Cliente deletado:', cliente, pessoa);
	  	res.redirect('/clientes');
	} catch (error) {
	  	res.render('error',{msg:'Erro ao deletar cliente.'});
	}
})



module.exports = router;