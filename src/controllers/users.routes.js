
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario.js');


router
.get("/", async (req,res)=>{
	try {
		const usuarios = await Usuario.findAll({attributes: { exclude: ['password'] },});
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

	const { inputEmail, inputUsername, inputPassword, confirmPassword, inputIsAdmin } = req.body;
		
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

	const emailExists = await Usuario.findOne({where:{email: inputEmail}});
	if(emailExists){
		return res.render('usuarios/form', {title:'Formulario de criacao de usuario', msg: 'Usuario ja cadastrado!' });
		// return res.status(422).json({msg: 'Usuario ja cadastrado!'});
	}

	// Criptografando a senha
	const  salt = await bcrypt.genSalt(12);
	const passwordHash = await bcrypt.hash(inputPassword, salt);

	// Criando o novo usuario
	const newUser = Usuario.create({
		email:		inputEmail,
		username:	inputUsername,
		password:	passwordHash,
		isAdmin:	isAdmin,
	})

	console.log({newUser});
	res.redirect('/usuarios');
})

// READ
// UPDATE
// DELETE
router
 .get('/delete/:id', async(req,res)=>{
	const codigo = req.params.id;
	try {
		const usuario = await Usuario.destroy({where:{id:codigo}});
		
		console.log('Usuario removido! \n',{usuario});
		res.redirect('/usuarios');
	} catch (error) {
		res.render('error',{msg:'Erro ao deletar usuario. \n' + error + '.'});
	}
 })



module.exports = router;