
const express = require('express');
const router = express.Router();

const Cliente = require('../models/Cliente');
const Empresa = require('../models/Empresa.js');

const Servico = require('../models/Servico.js');
const Nota = require('../models/Nota.js');
const ItensDaNota = require('../models/ItensDaNota.js');



// INDEX
router
.get("/", async (req,res)=>{
	try {
		const nota = await Nota.findAll({include:[
			Empresa,
			Cliente, 
			Servico,
		]});
		res.render('notas/index',{title:'Controle de Notas de Servico:',nota});
	} catch (error) {
		console.log(error)
		res.render('error',{msg:'Erro ao buscar notas. ' + error + '.'})
	}
})


// CREATE
router
 .get('/create', async (req,res)=>{
	const msg = req.params.msg;
	let empresa, clientes, servicos;
	try {
		try {
			empresa = await Empresa.findAll();
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar as informações da empresa.'});
		}
		try {
			clientes = await Cliente.findAll();
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar as informações dos clientes.'});
		}
		try {
			servicos = await Servico.findAll();
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar os sevricos.'});
		}
		res.render('notas/form',{title:'Entrada de Notas:',empresa,clientes,servicos,msg});
	} catch (error) {
		res.render('error',{msg:'Não foi possível carregar o formulário.'});
	}
 })
 .post('/create', async (req,res)=>{
	const {
		inputEmpresaId,
		inputClienteId,
		inputServicoId,
		inputQuantidade,
		inputValorTotal,
		inputPrazo,
		inputEntrega,
		inputObservacao,
	} = req.body;
	try {
		const nota = await Nota.create({
			EmpresaId: inputEmpresaId,
			ClienteId: inputClienteId,
			valor_total: inputValorTotal,
			observacao: inputObservacao,
			/*
			prazo: inputPrazo,
			entrega: inputEntrega,
			*/
		});
		const item = await ItensDaNota.create({
			NotaId: nota.id,
			ServicoId: inputServicoId,
			quantidade: inputQuantidade,
		})
		res.redirect('/notas')
	} catch (error) {
		res.render('error',{msg:'Não foi possível dar entrada na nota. ' + error + '.'});
	}
 });


// READ
router.get('/read/:id', async (req,res)=>{
	
});


// UPDATE
router
 .get('/update/:id', async (req,res)=>{
	try {
		const notas = await Nota.findAll({include:[Cliente,Empresa]});
		const item = await ItensDaNota.findAll({include:[Nota,Servico]});
		res.render('notas/form',{title:'Entrada de Notas:', notas, item});
	} catch (error) {
		res.render('error',{msg:'Não foi possível carregar o formulário.'});
	}
 })
 .post('/update/:id', async (req,res)=>{
	
 });


// DELETE
router.get('/delete/:id', async (req,res)=>{
	
});


module.exports = router;