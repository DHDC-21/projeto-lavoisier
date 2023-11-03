
const express = require('express');
const router = express.Router();

const Funcionario = require('../models/Funcionario');


router
 .get("/", async (req,res)=>{
	try {
		const funcionarios = await Funcionario.findAll();
		res.render('funcionarios/index',{title:'CONTORLE DE FUNCIONARIOS', funcionarios})
	} catch (error) {
		res.render('erro', {msg:error});
	}
})

// CREATE
router
 .get('/create', (req,res)=>{
	try {
		const funcionario = {}
		res.render('funcionarios/form',{title:'Cadastro de Funcionario', funcionario});
	} catch (error) {
		res.render('erro', {msg:error});
	}
 })
 .post('/create', async (req,res)=>{
	 const { inputNome, inputCPF, inputDtNascimento, inputLogradouro, inputNCasa, inputBairro, inputCEP, inputCidade, inputTelefone} = req.body;
	 try {
		const novoFuncionario = await Funcionario.create({
			nome: inputNome,
			cpf: inputCPF,
			dt_nascimento: inputDtNascimento,
			logradouro: inputLogradouro,
			n_casa: inputNCasa,
			bairro: inputBairro,
			cep: inputCEP,
			cidade: inputCidade,
			/* telefone: inputTelefone */
		})

		res.redirect('/funcionarios');
	} catch (error) {
		res.render('error', {msg:error});
	}
 })


 // READ
 router
  .get('/read', async (req,res)=>{
	try {
		//codigo
	} catch (error) {
		const msg = res.status()
		res.render('error', {msg:error})
	}
  })


// UPDATE
router
 .get('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	const funcionario = await Funcionario.findOne({where:{id:codigo}});
	try {
		if(funcionario){
			res.render('funcionarios/form',{title:'Formulario de Atualização', funcionario});
		} else {
			return error;
		}
	} catch (error) {
		res.render('error', {msg:error});
	}
 })
 .post('/update/:id', async (req,res)=>{
	 const codigo = req.params.id;
	 const { inputNome, inputCPF, inputDtNascimento, inputLogradouro, inputNCasa, inputBairro, inputCEP, inputCidade, inputTelefone} = req.body;
	 try {
		await Funcionario.update({
			nome: inputNome,
			cpf: inputCPF,
			dt_nascimento: inputDtNascimento,
			logradouro: inputLogradouro,
			n_casa: inputNCasa,
			bairro: inputBairro,
			cep: inputCEP,
			cidade: inputCidade,
			/* telefone: inputTelefone */
		},{
			where: {id:codigo}
		});

		res.redirect('/funcionarios');
	} catch (error) {
		res.render('error', {msg:error});
	}
 })

// DELETE
router
.get('/delete/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {

		await Funcionario.destroy({where:{id:codigo}});

		res.redirect('/funcionarios');
	} catch (error) {
		const msg = res.status()
		res.render('error', {msg})
	}
})


module.exports = router;