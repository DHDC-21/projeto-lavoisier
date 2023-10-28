
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
	res.render('servicos/form',{title:'Formulario'})
})
.post('/create', async (req,res)=>{
	const {inputDescricao, inputValorUnitario} = req.body;
	
	try {
		const servico = await Servico.create({
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
// UPDATE
// DELETE


module.exports = router;