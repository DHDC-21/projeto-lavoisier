
const Router = require('express');
const router = Router();

const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario.js');

router
.get("/", (req,res)=>{
	// res.send("Tela de funcionario");
	res.render("workes",{title:'CONTROLE DE FUNCIONARIOS'})
})


module.exports = router;