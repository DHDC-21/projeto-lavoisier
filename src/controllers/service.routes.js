
const express = require('express');
const router = express.Router();


const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario.js');

router
.get("/", (req,res)=>{
	// res.send("Tela de servicos");
	res.render("servicos/index",{title:'CONTROLE DE SERVICOS'})
})


module.exports = router;