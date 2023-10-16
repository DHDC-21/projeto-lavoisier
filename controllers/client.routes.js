const Router = require('express');
const router = Router();

const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario.js');
const Cliente = require('../models/Cliente.js');

// INDEX
router
.get("/", async (req,res)=>{
	try {
		// Buscar todos os clientes
    	const clientes = await Cliente.findAll();
		// Renderiza a tela com o registro geral de clientes
		res.render('index_client',{title:'CRUD de Clientes', clientes});

  	} catch (error) {
    	console.error('Erro ao buscar os clientes:', error);
    	res.status(500).send('Erro ao buscar os clientes.');
	}
});


// CREATE
router
.get("/create", (req,res)=>{
	res.render('form_client',{title:'Clientes'})
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

		const newClient = Cliente.create({
			nome: inputNome,
			cpf:  inputCPF,
			dt_nascimento: inputDtNascimento,
			logradouro: inputLogradouro,
			n_casa: inputNCasa,
			bairro: inputBairro,
			cep: inputCEP,
			cidade: inputCidade
		});

		console.log('Cliente criado:', newClient);
    	res.redirect('/clients');
	}  catch (error){
		console.error('Erro ao criar cliente:', error);
    	res.status(500).send('Erro ao criar cliente.');
	}
});


// READ
router
.get("/read/:id", async(req, res) => {
	const codigo   = req.params.id;
	res.send("Abrindo a ficha com codigo (" + codigo + ")" );
	
})


// UPDATE
router
.get("/update/:id", async (req,res) => {
	const codigo = req.params.id;
	res.send("Editanto o usuario de codigo  " + codigo);
}).post('/update/:id', async (req, res) => {
	try {
		const { id, nome, endereco, telefone, CPF } = req.body;
		const clientId = req.params.id;
	
		// Atualização do cliente usando o método update()
		const deleteClient = await Client.update(
			{ id, nome, endereco, telefone, CPF },
			{ where: { id: clientId } }
		);
  
	  	console.log('Cliente atualizado:', deleteClient);
	  	res.redirect('/clients');
	} catch (error) {
	  	console.error('Erro ao atualizar cliente:', error);
	  	res.status(500).send('Erro ao atualizar cliente.');
	}
})


// DELETE
router
.get("/delete/id", async (req,res)=>{
	const clientId = req.params.id;
	res.render("clientes_delete",{title:"Deletar Clientes",clientId});
})

.post("/delete/id", async (req,res)=>{
	try {
		const clientId = req.params.id;
	
		// Atualização do cliente usando o método update()
		const deleteClient = await Client.destroy(
			{ where: { id: clientId } }
		);
  
	  	console.log('Cliente deletado:', deleteClient);
	  	res.redirect('/clients');
	} catch (error) {
	  	console.error('Erro ao deletar cliente:', error);
	  	res.status(500).send('Erro ao deletar cliente.');
	}
})



module.exports = router;