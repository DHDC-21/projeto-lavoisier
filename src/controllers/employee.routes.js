
const express = require('express');
const router = express.Router();


const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario.js');

router
.get("/", (req,res)=>{
	// res.send("Tela de funcionario");
	res.render("funcionarios/index",{title:'CONTROLE DE FUNCIONARIOS'})
})


module.exports = router;