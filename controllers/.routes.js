
const Router = require('express');
const router = Router();

const bcrypt = require('bcrypt');

const Cliente = require('../models/Cliente.js');
const Funcionario = require('../models/Funcionario.js');
const Item = require('../models/Item.js');
const NotaServico = require('../models/NotaServico.js');
const Servico = require('../models/Servico.js');
const Usuario = require('../models/Usuario.js');



router
.get("", (req,res)=>{
	res.render("index",{title:"Menu principal"});
})


.get("/login", (req,res)=>{
	// res.send("Tela de login")
	res.render('login',{title:'Login'});
})
.post("/login", (req,res)=>{
	const username = req.body.inputUser;
	const password = req.body.inputPassword;

	let senhaHash = bcrypt.hashSync(password,10);

	Usuario.findOne({
		where: {
			username: username
		}
	}).then(usuario => {
		
	})
})


.get("/clients", async (req,res)=>{
	try {
		// Buscar todos os clientes
    	const clientes = await Cliente.findAll();
		// Renderiza a tela com o registro geral de clientes
		res.render('index_client',{title:'CRUD de Clientes', clientes});

  	} catch (error) {
    	console.error('Erro ao buscar os clientes:', error);
    	res.status(500).send('Erro ao buscar os clientes.');
	}
})
.get("/clients/create", (req,res)=>{
	res.render('form_client',{title:'Clientes'})
})
.post("/clients/create", (req,res)=>{
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
})

.get("/clients/update/:id", async (req,res) => {
	const codigo = req.params.id;
	res.send("Editanto o usuario de codigo  " + codigo);
})
.get("/clients/update/:id", async (req,res) => {
	const codigo = req.params.id;
	res.send("Editanto o usuario de codigo  " + codigo);
})
.get("/clients/update/:id", async (req,res) => {
	const codigo = req.params.id;
	res.send("Editanto o usuario de codigo  " + codigo);
})
.get("/clients/update/:id", async (req,res) => {
	const codigo = req.params.id;
	res.send("Editanto o usuario de codigo  " + codigo);
})


.get("/notes", (req,res)=>{
	res.send("Tela de notas")
})

.get("/services", (req,res)=>{
	res.send("Tela de servicos")
})

.get("/workes", (req,res)=>{
	res.send("Tela de funcionario")
})

.get("/users", (req,res)=>{
	res.send("Tela de usuarios")
})


module.exports = router;