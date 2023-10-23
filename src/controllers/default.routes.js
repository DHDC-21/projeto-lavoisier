
const express = require('express');
const router = express.Router();

// Importacoes necessaria para criar usuario
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario.js');


router
 .get('/', (req,res)=>{
	res.render('index',{title:'Menu Inicial'});
 })
 .get("/home", (req,res)=>{
	res.redirect("/");
})

 .get('/teste', (req,res)=>{
	res.render('teste',{title:'Testando', msg: ''});
 })
 .post('/teste', async (req,res)=>{
	
	const { inputUsername, inputPassword, confirmPassword, inputIsAdmin } = req.body;
		
	// Confirmacao de senhas
	if(inputPassword != confirmPassword){
		return res.status(422).json({msg: 'As senhas nao conferem!'});
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
		return res.status(422).json({msg: 'Usuario ja cadastrado!'});
	}

	// Criptografando a senha
	const  salt = await bcrypt.genSalt(12);
	const passwordHash = await bcrypt.hash(inputPassword, salt);

	// Criando o novo usuario
	const newUser = Usuario.create({
		username: inputUsername,
		password: passwordHash,
		isAdm: isAdmin
	})

	res.json({newUser});
	console.log({newUser});
 })


module.exports = router;