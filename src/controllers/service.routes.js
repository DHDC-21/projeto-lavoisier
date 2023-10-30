
const express = require('express');
const router = express.Router();

const Servico = require('../models/Servico.js');

router
.get("/", async (req,res)=>{
	const servicos = await Servico.findAll();
	res.render("servicos/index",{title:'CONTROLE DE SERVICOS', servicos})
})

// CREATE
router
.get('/create', (req,res)=>{
	const servico = {};
	res.render('servicos/form',{title:'Formulario de Cadastro', servico})
})
.post('/create', async (req,res)=>{
	const {inputDescricao, inputValorUnitario} = req.body;
	
	try {
		const novoServico = await Servico.create({
			descricao: inputDescricao,
			valor_unitario: inputValorUnitario
		})
		
		// console.log(servico);
		res.redirect('/servicos');

	} catch (error) {
		res.send('Aconteceu um erro inesperado!')
		console.log(error)
	}
})

// READ
// Obs: nao teremos essa funcionabilidade devido a baixa quantidade de campos da tabela Servico


// UPDATE
router
 .get('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	const servico = await Servico.findOne({ where: { id: codigo } });
	if(servico){
		res.render('servicos/form',{title:'Formulario de Atualizacao', servico});
	}
 })
 .post('/update/:id', async (req, res)=>{
	const codigo = req.params.id;
	const {inputDescricao, inputValorUnitario} = req.body;

	try {
		await Servico.update(
			{
				descricao: inputDescricao,
				valor_unitario: inputValorUnitario
			} , {
				where: {
					id: codigo
				}
			}
		)
		res.redirect('/servicos');	
	} catch{
		// tratamento de erro
	}
 })

// DELETE


module.exports = router;