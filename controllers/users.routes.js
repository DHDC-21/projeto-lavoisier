
const Router = require('express');
const router = Router();

const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario.js');

router
.get("/workes", (req,res)=>{
	res.send("Tela de funcionario")
})


module.exports = router;