
const express = require('express');
const router = express.Router();

const Servico = require('../models/Servico.js');

router
.get("/", async (req,res)=>{
	const servicos = await Servico.findAll();
	res.render("servicos/index",{title:'Controle de Serviços:', servicos})
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
		
		console.log(servico);
		res.redirect('/servicos');

	} catch (error) {
		res.render('error',{msg:'Não foi possível cadastrar o serviço.'})
	}
})

// READ
// Obs: nao teremos essa funcionabilidade devido a baixa quantidade de campos da tabela Servico


// UPDATE
router
 .get('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const servico = await Servico.findOne({ where: { id: codigo } });
		res.render('servicos/form',{title:'Formulario de Atualizacao', servico});
	} catch (error) {
		res.render('error',{msg:'Serviço não econtrado.'})
	}
 })
 .post('/update/:id', async (req, res)=>{
	const codigo = req.params.id;
	const {inputDescricao, inputValorUnitario} = req.body;

	try {
		const servico = await Servico.update(
			{
				descricao: inputDescricao,
				valor_unitario: inputValorUnitario
			} , {
				where: {
					id: codigo
				}
			}
		)
		console.log(servico);
		res.redirect('/servicos');	
	} catch{
		res.render('error',{msg:'Erro ao atualizar servico.'});
	}
 })

// DELETE
router.get('/delete/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const servico = await Servico.destroy({where:{id:codigo}});
		console.log(servico);
		res.redirect('/servicos')
	} catch (error) {
		res.render('error',{msg:'Erro ao deletar servico.'});
	}
})

module.exports = router;