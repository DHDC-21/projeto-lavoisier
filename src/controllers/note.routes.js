
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
			include: [
			  {
				model: ItensDaNota,
				include: [
				  {
					model: Servico,
				  },
				],
			  },
			  {
				model: Cliente,
			  },
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
		res.render('notas/form',{title:'Entrada de Notas:',empresa,clientes,servicos});
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
	  console.log('Criando Nota...');
	  const nota = await Nota.create({
		EmpresaId: inputEmpresaId,
		ClienteId: inputClienteId,

		valor_total: inputValorTotal,
		observacao: inputObservacao,
		
		prazo: inputPrazo,
		entrega: inputEntrega,
	  });
	  console.log(nota);
  
	  console.log('Criando Item da Nota...');
	  const item = await ItensDaNota.create({
		NotaId: nota.id,
		ServicoId: inputServicoId,
		quantidade: inputQuantidade,
		subtotal: inputSubtotal
	  });
	  console.log(item);
  
	  console.log('Redirecionando após inserção bem-sucedida...');
	  res.redirect('/notas');
	} catch (error) {
	  console.error('Erro durante a criação da nota:', error);
	  res.render('error', { msg: 'Não foi possível dar entrada na nota. ' + error + '.' });
	}
  });
  

// READ
router.get('/read/:id', async (req,res)=>{
	
});


// UPDATE
router
 .get('/update/:id', async (req,res)=>{
	const codigo = req.params.id;
	let empresa, clientes, sevicos, nota;
	try {
		nota = await Nota.findOne({where:{id:codigo}});
		try {
			empresa = await Empresa.findAll();
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar as informações da empresa.'});
		}
		try {
			clientes = await Cliente.findAll({where:{id:nota.ClienteId}});
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar as informações dos clientes.'});
		}
		try {
			servicos = await Servico.findAll();
		} catch (error) {
			res.render('error',{msg:'Não foi possível carregar os sevricos.'});
		}
		res.render('notas/form',{title:'Formulario de Atualização:',empresa,clientes,servicos});
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
	
			valor_total: inputValorTotal,
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
		
		res.redirect('/notas')
	} catch (error) {
		res.render('error',{msg:'Não foi possível atualizar a nota. ' + error + '.'});
	}
 });


// DELETE
router.get('/delete/:id', async (req,res)=>{
	
});


module.exports = router;