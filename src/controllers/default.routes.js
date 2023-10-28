
const express = require('express');
const router = express.Router();

// Importacoes necessaria para criar usuario
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario.js');


// MENU PRINCIPAL
router
 .get('/', (req,res)=>{
	res.render('index',{title:'Menu Inicial'});
 })
 .get("/home", (req,res)=>{
	res.redirect("/");
 })


// ROTA DE ERRO
 .get('/erro', (req,res)=>{
	res.render('error', {msg:'Uma mensagem de erro ocorreu. Insira a mensagem de erro aqui.'});
 })


// ROTA DE TESTES
 .get('/teste', (req,res)=>{
	res.render('teste',{title:'Testando', msg: ''});
 })
 .post('/teste', async (req,res)=>{
	res.render('teste',{title:'Testando', msg: ''});
 })


module.exports = router;