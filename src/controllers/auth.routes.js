
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario.js');

router
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
});


module.exports = router;