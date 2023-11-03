
const express = require('express');
const router = express.Router();


const Cliente = require('../models/Cliente.js');
const NotaDeServico = require('../models/NotaDeServico.js');
const Servico = require('../models/Servico.js');

// INDEX
router
.get("/", async (req,res)=>{
	try {
		// Buscar todos os clientes
    	const clientes = await Cliente.findAll();
		// Renderiza a tela com o registro geral de clientes
		res.render('clientes/index',{title:'CONTROLE DE CLIENTES', clientes});

  	} catch (error) {
    	res.status(500).render('erro',{msg:'erro na tela clientes'})
	}
});


// CREATE
router
.get("/create", (req,res)=>{
	const cliente = {};
	res.render('clientes/form',{title:'Cadastro de Clientes', cliente})
})
.post("/create", (req,res)=>{
	try{
		const { inputNome,
				inputCPF,
				inputDtNascimento,
				inputLogradouro,
				inputNCasa,
				inputBairro,
				inputCEP,
				inputCidade
			} = req.body;

		const novoCliente = Cliente.create({
			nome: inputNome,
			cpf:  inputCPF,
			dt_nascimento: inputDtNascimento,
			logradouro: inputLogradouro,
			n_casa: inputNCasa,
			bairro: inputBairro,
			cep: inputCEP,
			cidade: inputCidade
		});

		console.log('Cliente criado:', novoCliente);
    	res.redirect('/clientes');
	}  catch (error){
		console.error('Erro ao criar cliente:', error);
    	res.status(500).send('Erro ao criar cliente.');
	}
});


// READ
router.get("/read/:id", async (req, res) => {
    const codigo = req.params.id;
	const cliente = await Cliente.findOne(
		{ where: { id: codigo } }
	);
	const notas = await NotaDeServico.findAll({
		include: [Cliente, Servico],
		where: {
			ClienteID: codigo
		}
	})
	
	if(cliente){
		res.render('clientes/profile',{title:'Ficha do Cliente', cliente, notas});
	} else{
		res.render('erro',{msg:'Cliente nao encontrado!'})
	}
});





// UPDATE
router
.get("/update/:id", async (req,res) => {
	const codigo = req.params.id;
    const cliente = await Cliente.findOne(
        { where: { id: codigo } }
    );
	
	if(cliente){
		res.render('clientes/form',{title:'Formulario de Atualização', cliente});
	} else{
		res.render('erro',{msg:'Cliente nao encontrado!'})
	}

})
.post('/update/:id', async (req, res) => {
	const codigo = req.params.id;
	const {
		inputNome,
		inputCPF,
		inputDtNascimento,
		inputLogradouro,
		inputNCasa,
		inputBairro,
		inputCEP,
		inputCidade,
		inputTelefone
	} = req.body;

	try {
		await Cliente.update({
			nome: inputNome,
			cpf: inputCPF,
			dt_nascimento: inputDtNascimento,
			logradouro: inputLogradouro,
			n_casa: inputNCasa,
			bairro: inputBairro,
			cep: inputCEP,
			cidade: inputCidade,
			telefone: inputTelefone
		},{
			where:{
				id: codigo
			}
		})
		res.redirect('/clientes');
	} catch (error) {
		// codigo
	}

})


// DELETE
router
.get("/delete/:id", async (req,res)=>{
	try {
		const codigo = req.params.id;	// Pegando o código do cliente pelo parametro id
	
		const deleteClient = await Cliente.destroy(
			{ where: { id: codigo } }
		);
  
	  	console.log('Cliente deletado:', deleteClient);
	  	res.redirect('/clients');
	} catch (error) {
	  	console.error('Erro ao deletar cliente:', error);
	  	res.status(500).send('Erro ao deletar cliente.');
	}
})



module.exports = router;