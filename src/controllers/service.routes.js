
const Router = require('express');
const router = Router();

const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario.js');

router
.get("/", (req,res)=>{
	// res.send("Tela de servicos");
	res.render("service",{title:'CONTROLE DE SERVICOS'})
})


module.exports = router;