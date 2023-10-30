
const express = require('express');
const router = express.Router();



const Cliente = require('../models/Cliente.js');
const NotaDeServico = require('../models/NotaDeServico.js');
const Servico = require('../models/Servico.js');


router
.get("/", async (req,res)=>{
	const notas = await NotaDeServico.findAll({
		include: [Cliente, Servico],
	});
	  
	res.render("notas/index", { title: 'CONTROLE DE NOTAS', notas });	  
})


// CREATE
router
 .get('/create', async (req,res)=>{
	 try {
		const clientes = await Cliente.findAll();
		const servicos = await Servico.findAll();
		const nota = {};
		res.render('notas/form',{title:'Entrada de Nota', clientes, servicos, nota});
	} catch (error) {
		res.render('error',{msg:error});
	}
 })
 .post('/create', async (req,res)=>{
	const {inputClienteId, inputServicoId, inputQuantidade, inputPrazo} = req.body;
	await NotaDeServico.create({
		quantidade: inputQuantidade,
		prazo: inputPrazo,
		ClienteId: inputClienteId,
		ServicoId: inputServicoId
	})
	res.redirect('/notas')
 });


// READ
router.get('/read/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const nota = await NotaDeServico.findOne({
			include: [Cliente, Servico],
			where: { id: codigo }
		});
		res.render('notas/profile', {title:'Detalhes da nota (${nota.id})', nota});
	} catch (error) {
		res.render('error',{msg:error});
	}
});


// UPDATE
router
 .get('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const nota = await NotaDeServico.findOne({where:{id:codigo}});
		const clientes = await Cliente.findAll({where:{id:nota.ClienteId}});
		const servicos = await Servico.findAll(/*{where:{id:nota.ServicoId}}*/);
		res.render('notas/form',{title:'Formulario de Atualização - Cod.(' + nota.id + ')', nota, clientes, servicos});
	} catch (error) {
		res.render('error',{msg:error});
	}
 })
 .post('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	const {inputClienteId, inputServicoId, inputQuantidade, inputPrazo} = req.body;
	try {
		await NotaDeServico.update({
			quantidade: inputQuantidade,
			prazo: inputPrazo,
			ClienteId: inputClienteId,
			ServicoId: inputServicoId
		},{
			where: { id: codigo }
		});
		res.redirect('/notas');
	} catch (error) {
		res.render('error',{msg:error});
	}
 });


// DELETE
router.get('/delete/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		await NotaDeServico.destroy({
			where: { id: codigo}
		});
		res.redirect('/notas');
	} catch (error) {
		res.render('error',{msg:error});
	}
});


module.exports = router;