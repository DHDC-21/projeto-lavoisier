
const express = require('express');
const router = express.Router();

const Cliente = require('../models/Cliente');

const Servico = require('../models/Servico.js');
const Nota = require('../models/Nota.js');
const ItensDaNota = require('../models/ItensDaNota.js');


// INDEX
router
.get("/", async (req,res)=>{
	try {
		const clientes = await Cliente.findAll();
		res.render('clientes/index',{title:'Controle de Clientes:',clientes});
	} catch (error) {
		res.render('error',{msg:'Erro ao buscar clientes.'});
	}
});


// CREATE
router
.get("/create", (req,res)=>{
	try {
		const cliente = {};
		res.render('clientes/form',{title:'Cadastro de Cliente:',cliente,msg:''});
	} catch (error) {
		res.render('error',{msg:'Erro no formulário de cadastro.'})
	}
})

.post("/create", async (req,res)=>{
	const {
		inputRazaoSocial,
		inputCpfCnpj,
		inputInscMunicipal,
		inputEndereco,
		inputMunicipio,
		inputEstado,
		inputEmail
	} = req.body;
	try {
		const cliente = await Cliente.create({
			razao_social: 	inputRazaoSocial,
			cpf_cnpj: 		inputCpfCnpj,
			insc_municipal: inputInscMunicipal,
			endereco:		inputEndereco,
			municipio:		inputMunicipio,
			estado:			inputEstado,
			email:			inputEmail,
		});
		res.redirect('/clientes');
	} catch (error) {
		res.render('clientes/form',{title:'Cadastro de Cliente',msg:'Erro ao criar cliente!'})
	}
});


// READ
router.get("/read/:id", async (req, res) => {
   const codigo = req.params.id;
   let cliente, nota;
   try {
		try {
			cliente = await Cliente.findOne({where:{id:codigo}});
		} catch (error) {
			res.render('error',{msg:'Cliente nao encontrado!'});
		}
		try {
			nota = await Nota.findAll({
				include:[{model:ItensDaNota,include:[Servico]}],
				where:{ClienteId:codigo}
			});
		} catch (error) {
			res.render('error',{msg:'Notas do cliente nao encontradas!'});
		}
		res.render('clientes/profile',{title:cliente.razao_social,cliente,nota});
	} catch (error) {
		res.render('error',{msg:'Recurso indisponível!'});
	}
});
router.get("/read", (req,res)=>{
	const cliente = {};
	const notas = {};
	res.render('clientes/profile',{title:'Exibição Default',cliente,notas});
})





// UPDATE
router
.get("/update/:id", async (req,res) => {
	const codigo = req.params.id;
	try {
		const cliente = await Cliente.findOne({where:{id:codigo}});
		res.render('clientes/form',{title:'Formulário de Atualização',cliente,msg:''});
	} catch (error) {
		res.render('error',{msg:'Cliente nao encontrado.'});
	}
})

.post('/update/:id', async (req, res) => {
	const codigo = req.params.id;
	const {
		inputRazaoSocial,
		inputCpfCnpj,
		inputInscMunicipal,
		inputEndereco,
		inputMunicipio,
		inputEstado,
		inputEmail
	} = req.body;
	try {
		const cliente = await Cliente.update({
			razao_social: 	inputRazaoSocial,
			cpf_cnpj: 		inputCpfCnpj,
			insc_municipal: inputInscMunicipal,
			endereco:		inputEndereco,
			municipio:		inputMunicipio,
			estado:			inputEstado,
			email:			inputEmail,
		},{
			where:{id:codigo}
		});
		res.redirect('/clientes');
	} catch (error) {
		res.render('error',{msg:'Não foi possível atualizar o cadastro.'})
	}
})


// DELETE
router
.get("/delete/:id", async (req,res)=>{
	const codigo = req.params.id;
	try {
		const cliente = await Cliente.destroy({where:{id:codigo}});
		res.redirect('/clientes');
	} catch (error) {
		res.render('error',{msg:'Não foi possível excluir o cliente.'});
	}
})



module.exports = router;