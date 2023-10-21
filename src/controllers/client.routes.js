const Router = require('express');
const router = Router();

const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario.js');
const Cliente = require('../models/Cliente.js');
const { where } = require('sequelize');

// INDEX
router
.get("/", async (req,res)=>{
	try {
		// Buscar todos os clientes
    	const clientes = await Cliente.findAll();
		// Renderiza a tela com o registro geral de clientes
		res.render('client',{title:'CONTROLE DE CLIENTES', clientes});

  	} catch (error) {
    	console.error('Erro ao buscar os clientes:', error);
    	res.status(500).send('Erro ao buscar os clientes.');
	}
});


// CREATE
router
.get("/create", (req,res)=>{
	res.render('client_form',{title:'Clientes'})
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
router.get("/read/:id", async (req, res) => {
    const codigo = req.params.id;
    const client = await Cliente.findOne(
        { where: { id: codigo } }
    );

	res.send(
		"<p> Sistema em desenvolvimento... </p>" +
		"<p> Visualizando o cadastro de " + client.nome + " codigo: (" + client.id + ")</p>"
	);

    // if (client) {
    //     res.render('client-view', { title: 'Visualização de Cliente', client }); // Passar o objeto client para a página EJS
    // } else {
    //     res.send('Cliente com o ID ' + codigo + ' não encontrado.');
    // }
});





// UPDATE
router
.get("/update/:id", async (req,res) => {
	const codigo = req.params.id;
	const cliente = await Cliente.findAll({
		where:{id: codigo}
	})
	
	req.send(
		"<p> Sistema em desenvolvimento... </p>" +
		"<p> Atuizando o cadastro de " + client.nome + " codigo: (" + client.id + ")</p>"
		);
	// DESENVOLVER CODIGO DE ATUALIZACAO DE CADASTRO

})
.post('/update/:id', async (req, res) => {

	req.send(
		"<p> Sistema em desenvolvimento... </p>" +
		"<p> Atuizando o cadastro de " + client.nome + " codigo: (" + client.id + ")</p>"
		);
	// DESENVOLVER CODIGO DE ATUALIZACAO DE CADASTRO

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