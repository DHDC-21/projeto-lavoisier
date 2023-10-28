
const express = require('express');
const router = express.Router();


const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario.js');

router
.get("/", async (req,res)=>{
	try {
		const usuarios = await Usuario.findAll();
		res.render("usuarios/index", {title:'CONTROLE DE USUARIOS', usuarios})
	} catch (error) {
		console.log(error)
		res.send('Pagina com erro!')
	}
})

// CREATE
router
.get('/create',(req,res)=>{
	res.render('usuarios/form',{title:'Formulario de criacao de usuario', msg: ''});
})
.post('/create', async (req,res)=>{

	const { inputUsername, inputPassword, confirmPassword, inputIsAdmin } = req.body;
		
	// Conformando digitação de senhas
	if(inputPassword != confirmPassword){
		return res.render('usuarios/form', {title:'Formulario de criacao de usuario', msg: 'As senhas nao conferem!' });
		// return res.status(422).json({msg: 'As senhas nao conferem!'});
	}
	
	var isAdmin;

	if(inputIsAdmin == 'on'){
		isAdmin = 1;
	} else {
		isAdmin = 0;
	}

	// Ver se o usuario existe
	const userExists = await Usuario.findOne({where:{username: inputUsername}});
	if(userExists){
		return res.render('usuarios/form', {title:'Formulario de criacao de usuario', msg: 'Usuario ja cadastrado!' });
		// return res.status(422).json({msg: 'Usuario ja cadastrado!'});
	}

	// Criptografando a senha
	const  salt = await bcrypt.genSalt(12);
	const passwordHash = await bcrypt.hash(inputPassword, salt);

	// Criando o novo usuario
	const newUser = Usuario.create({
		username: inputUsername,
		password: passwordHash,
		isAdmin: isAdmin
	})

	res.redirect('/usuarios');
	console.log({newUser});
})

// READ
// UPDATE
// DELETE


module.exports = router;