
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { checkAuthCookie } = require('../middlewares/authMiddleware.js');
const Usuario = require('../models/Usuario.js');


// MENU PRINCIPAL
router
 .get('/', checkAuthCookie, (req,res)=>{
	res.render('index',{title:'Menu Inicial'});
 })
 .get("/home", checkAuthCookie, (req,res)=>{
	res.redirect('/');
 })


// ROTA DE ERRO
 .get('/erro', (req,res)=>{
	res.render('error', {msg:'Uma mensagem de erro ocorreu. Insira a mensagem de erro aqui.'});
 })


// ROTA DE AUTENTICACAO
 .get("/login", (req, res)=>{
	res.render('login', { title: 'Login', msg: '' });
  })
  
 .post("/login", async (req, res)=>{
	const { inputUsername, inputPassword } = req.body;
  
	try {
	  const user = await Usuario.findOne({ where: { username: inputUsername } });
  
	  if (!user) {
		return res.render('login', { title: 'Login', msg: 'Usuário não encontrado.' });
	  }
  
	  const checkPassword = await bcrypt.compare(inputPassword, user.password);
  
	  if (!checkPassword) {
		return res.render('login', { title: 'Login', msg: 'Usuário e/ou senha estão errados!' });
	  }
  
	  res.cookie('auth_token', jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1h' }));
  
	  res.redirect('/'); // Redireciona para a rota raiz
	} catch (error) {
	  console.log(error);
	  res.render('error', { msg: 'Erro interno no servidor.' });
	}
  })
  .get('/logout', (req,res)=>{
	res.clearCookie('auth_token');
	res.redirect('/login');
  })


// ROTA DE TESTES
 .get('/teste', (req,res)=>{
	res.render('teste',{title:'Testando', msg: ''});
 })
 .post('/teste', async (req,res)=>{
	res.render('teste',{title:'Testando', msg: ''});
 })


module.exports = router;