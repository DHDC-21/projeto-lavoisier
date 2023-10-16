
const Router = require('express');
const router = Router();

const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario.js');

router
.get("/notes", (req,res)=>{
	res.send("Tela de notas")
})


module.exports = router;