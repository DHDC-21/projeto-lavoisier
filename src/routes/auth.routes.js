
const { Router } = require("express");
const router = Router();

const bcrypt = require('bcrypt');
const User = require("../models/User");
User.sync();	//? Use isso daqui para sincronizar as tabelas AO UTILIZA-LAS.


router
.get("/",(req,res)=>{
	res.render("login", {title:"Authenticação"})
})
.post("/login", async (req, res) => {
	const { username, password } = req.body;

	  // Buscar usuário pelo nome de usuário
	  const user = await User.findOne({ where: { usuario: username } });

	if(!user)
	{
		res.json("Teste");
		return;
	}

	//const senha = await bcrypt.compare(password, user.senha);
	  // Verificar se o usuário existe e se a senha corresponde
	  if (password == user.senha) {
		// Autenticação bem-sucedida
	  	//res.json({ message: 'Autenticação bem-sucedida' });
		res.redirect("/clients");
	  } else {
		// Falha na autenticação
		res.status(401).json({ message: 'Falha na autenticação' });
	  }
})


module.exports = router;