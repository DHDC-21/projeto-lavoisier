
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
		const nota = await Nota.findAll({
			include:[
				{
					model: ItensDaNota,
					include: [{model: Servico,},],
				},
				{model: Cliente,},
			],
		})
		  
		res.render('notas/index',{title:'Controle de Notas de Servico:',nota});
	} catch (error) {
		console.log(error)
		res.render('error',{msg:'Erro ao buscar notas. ' + error + '.'})
	}
})


// CREATE
router
 .get('/create', async (req,res)=>{
	let empresas, clientes, servicos, notas;
	try {
		try {
			notas = await Nota.findAll({include:[Cliente]});
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar as notas.'});
		}
		try {
			empresas = await Empresa.findAll();
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
		res.render('notas/form',{title:'Entrada de Notas:',empresas,clientes,servicos,notas});
	} catch (error) {
		res.render('error',{msg:'Não foi possível carregar o formulário.'});
	}
 })
 router.post('/create', async (req, res) => {
	const {
	  inputEmpresaId,
	  inputNotaId,
	  inputCodigo,
	  inputClienteId,
	  inputServicoId,
	  // inputValorUnitario,
	  inputQuantidade,
	  inputPrazo,
	  inputEntrega,
	  inputSubtotal,
	  inputInss,
	  inputAliquota,
	  inputValorTotal,
	  inputObservacao,
	} = req.body;
  
	try {
		const nota = {};

		if(inputNotaId == 0){
			console.log('Criando Nota... \n');
			nota = await Nota.create({
			  EmpresaId: inputEmpresaId,
			  ClienteId: inputClienteId,
	  
			  // valor_total: inputValorTotal,
			  observacao: inputObservacao,
			  
			  prazo: inputPrazo,
			  entrega: inputEntrega,
			});
		} else {
			console.log('Adicionando item a nota... \n')
			nota = await Nota.update({
				EmpresaId: inputEmpresaId,

				observacao: inputObservacao,
			  
				prazo: inputPrazo,
			  	entrega: inputEntrega,
			},{
				where:{id:inputNotaId}
			});
		}
	  console.log(nota);
  
	  console.log('Criando Item da Nota...');
	  const item = await ItensDaNota.create({
		NotaId: nota.id,
		ServicoId: inputServicoId,
		quantidade: inputQuantidade,
		subtotal: inputSubtotal
	  });
	  console.log(item);
  
	  console.log(inputNotaId);
	  console.log('Redirecionando após inserção bem-sucedida...');
	  res.redirect('/notas');
	} catch (error) {
	  console.error('Erro durante a criação da nota:', error);
	  res.render('error', { msg: 'Não foi possível dar entrada na nota. ' + error + '.' });
	}
  });
  

// READ
router.get('/read/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const nota = await Nota.findAll({
			include:[
				{
					model:ItensDaNota,
					include:[{model:Servico,},],
					where:{NotaId:codigo}
				},
				{model: Cliente,},
			],
			},{
				where:{id:codigo}
		})
		res.render('notas/profile',{title:'Comprovante(' + nota.id + ')',nota})
	} catch (error) {
		console.log('Erro e exibição. \n' + error + '.')	
	}
});
router.get('/read', async (req,res)=>{
	const nota = {
		ItensDaNota:{
			Servico:{}
		},
		Cliente:{},
		Empresa:{},
	}
	try {
		res.render('notas/profile',{title:'Comprovante(' + nota.id + ')',nota})
	} catch (error) {
		console.log('Erro e exibição. \n' + error + '.')	
	}
});


// UPDATE
router
 .get('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	let empresas, clientes, servicos, notas;
	try {
		try {
			notas = await Nota.findAll({include:[Cliente],where:{id:codigo}});
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar a nota.'});
		}
		try {
			empresas = await Empresa.findAll();
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar as informações da empresa.'});
		}
		try {
			clientes = await Cliente.findAll({where:{id:notas[0].ClienteId}});
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar as informações dos clientes.'});
		}
		try {
			servicos = await Servico.findAll();
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar os sevricos.'});
		}
		res.render('notas/form',{title:'Formulario de Atualização:',empresas,clientes,servicos,notas});
	} catch (error) {
		res.render('error',{msg:'Não foi possível carregar o formulário.'});
	}
 })
 .post('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	const {
		inputEmpresaId,
		inputNotaId,
		inputCodigo,
		inputClienteId,
		inputServicoId,
		// inputValorUnitario,
		inputQuantidade,
		inputPrazo,
		inputEntrega,
		inputSubtotal,
		inputInss,
		inputAliquota,
		inputValorTotal,
		inputObservacao,
	  } = req.body;
	try {
		
		const nota = await Nota.update({
			EmpresaId: inputEmpresaId,
			// ClienteId: inputClienteId,
	
			// valor_total: inputValorTotal,
			observacao: inputObservacao,
			
			prazo: inputPrazo,
			entrega: inputEntrega,
		},{
			where:{id:codigo}
		});
	  
		const item = await ItensDaNota.update({
			// NotaId: nota.id,
			ServicoId: inputServicoId,
			quantidade: inputQuantidade,
			subtotal: inputSubtotal,
		},{
			where:{NotaId:codigo}
		});
		
		console.log('Nota atualizada! \n',nota,item);
		res.redirect('/notas')
	} catch (error) {
		res.render('error',{msg:'Não foi possível atualizar a nota. \n' + error + '.'});
	}
 });


// DELETE
router.get('/delete/:id', async (req,res)=>{
	const codigo = req.params.id;
	try {
		const item = await ItensDaNota.destroy({where:{NotaId:codigo}});
		const nota = await Nota.destroy({where:{id:codigo}});

		console.log('Nota removida! \n',item,nota);
		res.redirect('/notas');
	} catch (error) {
		res.render('error',{msg:'Não foi possível excluir a nota. \n'})
	}
});


module.exports = router;