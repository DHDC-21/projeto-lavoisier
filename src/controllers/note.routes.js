
const express = require('express');
const router = express.Router();


const Pessoa = require('../models/Pessoa.js');

const Usuario = require('../models/Usuario.js');
const Cliente = require('../models/Cliente.js');

const NotaDeServico = require('../models/NotaDeServico.js');
const ItemDaNota = require('../models/ItemDaNota.js');
const Servico = require('../models/Servico.js');



// INDEX
router
.get("/", async (req,res)=>{
	try {
		const notas = await ItemDaNota.findAll({
			include:[NotaDeServico, Servico],
		});

		res.render("notas/index", { title: 'CONTROLE DE NOTAS', notas });	 

	} catch (error) {
		console.log(error);
		res.render('error',{msg:'Recurso indisponível!', router:'/'})
	}
})


// CREATE
router
 .get('/create', async (req,res)=>{
	 try {
		const clientes = await Cliente.findAll({include:[Pessoa]});
		const servicos = await Servico.findAll();
		res.render('notas/form',{title:'Entrada de Nota', clientes, servicos});
	} catch (error) {
		res.render('error',{msg:error});
	}
 })
 .post('/create', async (req,res)=>{
	const {inputClienteId, inputServicoId, inputQuantidade, inputPrazo} = req.body;
	try {
		const novaNota = await NotaDeServico.create({
			ClienteId: inputClienteId,
			prazo: inputPrazo,
		});

		const novoItem = await ItemDaNota.create({
			quantidade: inputQuantidade,
			NotaDeServicoId: novaNota.id,
			ServicoId: inputServicoId,
		});
		
		console.log('Entrada de nota! ', novaNota, novoItem);
		res.redirect('/notas');

	} catch (error) {
		console.log(error);
		res.render('error',{msg:'Erro ao cadastrar nota.', router:'/notas'});
	} 
	
 });


// READ
router.get('/read/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const nota = await ItemDaNota.findAll({
			include: [NotaDeServico, Servico],
			where: { NotaDeServicoId: codigo },
		});

		const cliente = await Cliente.findOne({
			include:[Pessoa],
			where:{id: nota[0].NotaDeServico.ClienteId},
		})

		res.render('notas/profile', {title:'Detalhes da nota (${nota.id})', nota, cliente});
	} catch (error) {
		res.render('error',{msg:error});
	}
});


// UPDATE
router
 .get('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const nota = await ItemDaNota.findOne({
			include:[NotaDeServico, Servico],
			where:{NotaDeServicoId:codigo}
		});

		const clientes = await Cliente.findAll({include:[Pessoa],where:{id:nota.NotaDeServico.ClienteId}});

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
		const nota = await NotaDeServico.update({
			ClienteId: inputClienteId,
			prazo: inputPrazo,
		},{
			where: { id: codigo }
		});

		const item = await ItemDaNota.update({
			NotaDeServicoId: codigo,
			ServicoId: inputServicoId,
			quantidade: inputQuantidade,
		},{
			where:{NotaDeServicoId: codigo}
		});

		console.log('Atualização de nota: ', nota, item);
		res.redirect('/notas');

	} catch (error) {
		res.render('error',{msg:error});
	}
 });


// DELETE
router.get('/delete/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const nota = await NotaDeServico.destroy({
			where: { id: codigo}
		});

		const item = await ItemDaNota.destroy({
			where:{NotaDeServicoId:codigo}
		});

		console.log('Nota deletada! ', nota, item);
		res.redirect('/notas');

	} catch (error) {
		console.log(error)
		res.render('error',{msg:'Esso ao deletar nota', router:''});
	}
});


module.exports = router;