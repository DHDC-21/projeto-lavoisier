
const Router = require('express');
const router = Router();

const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario.js');

router
.get("/services", (req,res)=>{
	res.send("Tela de servicos")
})


module.exports = router;