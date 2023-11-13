
const express = require('express');
const router = express.Router();

const Empresa = require('../models/Empresa.js');


// INDEX
router.get('/', async (req,res)=>{
	try {
		const empresa = await Empresa.findAll();
		res.render('empresa/index',{title:'Minha Empresa:',empresa});
	} catch (error) {
		res.render('error',{msg:'Função indisponível.'});
	}
});

// CREATE
router
 .get('/create', (req,res)=>{
	try {
		const empresa = {};
		res.render('empresa/form',{title:'Cadastro de Empresa Filial:',empresa});
	} catch (error) {
		res.render('error',{msg:'Não foi possível carregar o formulário.'});
	}
 })
 .post('/create', async (req,res)=>{
	const{
		inputRazaoSocial,
		inputCNPJ,
		inputEndereco,
		inputMunicipio,
		inputEstado,
	} = req.body
	try {
		const empresa = await Empresa.create({
			razao_social:	inputRazaoSocial,
			cnpj:			inputCNPJ,
			endereco:		inputEndereco,
			municipio:		inputMunicipio,
			estado:			inputEstado,
		});

		console.log('Filial cadastrada! \n',empresa);
		res.redirect('/empresa');
	} catch (error) {
		res.render('error',{msg:'Não foi possível cadastrar nova filial.'});
	}
 });


// READ
// Essa funcionalidade sera inclusa dentro do index para poupar tempo


// UPDATE
router
 .get('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const empresa = await Empresa.findByPk(codigo);
		res.render('empresa/form',{title:'Formulário de Atualização:',empresa});
	} catch (error) {
		res.render('error',{msg:'Não foi possível carregar o formulário.'});
	}
 })
 .post('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	const{
		inputRazaoSocial,
		inputCNPJ,
		inputEndereco,
		inputMunicipio,
		inputEstado,
	} = req.body
	try {
		const empresa = await Empresa.update({
			razao_social:	inputRazaoSocial,
			cnpj:			inputCNPJ,
			endereco:		inputEndereco,
			municipio:		inputMunicipio,
			estado:			inputEstado,
		},{
			where:{id:codigo}
		});

		console.log('Filial atualizada! \n',empresa);
		res.redirect('/empresa');
	} catch (error) {
		res.render('error',{msg:'Função indisponível.'});
	}
 });


// DELETE
router.post('/delete:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const empresa = await Empresa.destroy({where:{id:codigo}});
		console.log('Filial removida! \n', empresa);
		res.redirect('/empresa');
	} catch (error) {
		res.render('error',{msg:'Erro ao deletar empresa filial.'});
	}
});


module.exports = router;