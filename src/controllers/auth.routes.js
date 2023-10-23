
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSalt(12);
require('dotenv').config();

const Usuario = require('../models/Usuario.js');

router
.get("/login", (req,res)=>{
	// res.send("Tela de login")
	res.render('login',{title:'Login'});
})
.post("/login", async (req,res)=>{
	const { inputUsername, inputPassword } = req.body; // recuperando input
	
	await Usuario.sync();
	const user = await Usuario.findOne({where:{username:inputUsername}})
	
	if(!user){
		return res.send("Usuario nao encontrado!");
	}

	const checkPassword = await bcrypt.compare(inputPassword, user.password)
	if(!checkPassword){
		return res.send("Senha invalida!");
	}

	try{
		const secret = process.env.SECRET;
		const token = jwt.sign({id: user.id}, secret);
		res.send({
			msg:'Autenticacao realizada com sucesso!',
			token
		})

	} catch(err){
		console.log(error);
	}
})


module.exports = router;