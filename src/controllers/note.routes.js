
const express = require('express');
const router = express.Router();


const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario.js');
const Cliente = require('../models/Cliente.js');
const NotaServico = require('../models/NotaServico.js');
const Servico = require('../models/Servico.js');


router
.get("/", (req,res)=>{
	const notas = NotaServico.findAll();
	res.render("notas/index",{title: 'CONTROLE DE NOTAS', notas});
})


module.exports = router;