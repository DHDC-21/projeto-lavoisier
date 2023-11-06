
const express = require('express');
const router = express.Router();

const Funcionario = require('../models/Funcionario');
const Pessoa = require('../models/Pessoa.js');


router
 .get("/", async (req,res)=>{
	try {
		const funcionarios = await Funcionario.findAll({include:[Pessoa]});
		res.render('funcionarios/index',{title:'CONTORLE DE FUNCIONARIOS', funcionarios})
	} catch (error) {
		console.log(error);
		res.render('error', {msg:'Recurso indisponível!', router:'/'});
	}
})

// CREATE
router
 .get('/create', (req,res)=>{
	try {
		const funcionario = {Pessoa:{}}
		res.render('funcionarios/form',{title:'Cadastro de Funcionario', funcionario});
	} catch (error) {
		console.log(error);
		res.render('error', {msg:'Erro no formulário de cadastro!', router:'/funcionarios'});
	}
 })
 .post('/create', async (req,res)=>{
	 const { inputNome, inputCPF, inputDtNascimento, inputLogradouro, inputNCasa, inputBairro, inputCEP, inputCidade, inputTelefone} = req.body;
	 try {
		const novaPessoa = await Pessoa.create({
			nome: inputNome,
			cpf: inputCPF,
			dt_nascimento: inputDtNascimento,
			logradouro: inputLogradouro,
			n_casa: inputNCasa,
			bairro: inputBairro,
			cep: inputCEP,
			cidade: inputCidade,
			telefone: inputTelefone
		});

		const novoFuncionario = await Funcionario.create({
			PessoaId: novaPessoa.id
		});

		console.log('Novo funcionario! ', novoFuncionario, novaPessoa);
		res.redirect('/funcionarios');
	} catch (error) {
		console.log(error);
		res.render('error', {msg:'Erro ao cadastrar funcionário.', router:'/funcionarios'});
	}
 })


 // READ
 router
  .get('/read/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const funcionario = await Funcionario.findOne({include:[Pessoa],where:{id:codigo}});
		res.render('funcionarios/profile',{title:funcionario.Pessoa.nome,funcionario})
	} catch (error) {
		console.log(error);
		res.render('error', {msg:'Erro ao visualizar o cadastro do funcionário.',router:'/funcionarios'})
	}
  })


// UPDATE
router
 .get('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	const funcionario = await Funcionario.findOne({include:[Pessoa],where:{id:codigo}});
	try {
		res.render('funcionarios/form',{title:'Formulário de Atualização', funcionario});
	} catch (error) {
		console.log(error);
		res.render('error', {msg:'Erro no formulário de  atualização de cadastro.', router:'/funcionarios'});
	}
 })
 .post('/update/:id', async (req,res)=>{
	 const codigo = req.params.id;
	 const { inputNome, inputCPF, inputDtNascimento, inputLogradouro, inputNCasa, inputBairro, inputCEP, inputCidade, inputTelefone} = req.body;
	 try {
		const funcionario = await Funcionario.findOne({include:[Pessoa],where:{id:codigo}});
		
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
			where:{id:funcionario.PessoaId}
		});

		console.log('Funcionario atualizado: ', funcionario, pessoa);
		res.redirect('/funcionarios');

	} catch (error) {
		console.log(error)
		res.render('error', {msg:'Erro ao atualizar funcionario.', route:'/funcionarios'});
	}
 })

// DELETE
router
.get('/delete/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const funcionario = await Funcionario.findOne({include:[Pessoa],where:{id:codigo}});

		await Funcionario.destroy({where:{id:funcionrio.id}})

		const pessoa = await Pessoa.destroy({where:{id:funcionario.PessoaId}});

		console.log('Funcionario deletado: ', funcionario, pessoa);
		res.redirect('/funcionarios');
	} catch (error) {
		res.render('error', {msg:'Erro ao deletar funcionario.', router:'/funcionarios'});
	}
})


module.exports = router;