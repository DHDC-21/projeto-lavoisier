
const { Router } = require("express");
const router = Router();

const bcrypt = require('bcrypt');
const User = require("../models/Client");


router
.get("/",(req,res)=>{
	res.render("login",{title:"Authenticação"})
})
.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
	  // Buscar usuário pelo nome de usuário
	  const user = await User.findOne({
		where: {
			usuario: username }
	});
  
	  // Verificar se o usuário existe e se a senha corresponde
	  if (user && await bcrypt.compare(password, user.senha)) {
		// Autenticação bem-sucedida
		res.json({ message: 'Autenticação bem-sucedida' });
		res.redirect("/clients");
	  } else {
		// Falha na autenticação
		res.status(401).json({ message: 'Falha na autenticação' });
	  }
	} catch (error) {
	  console.error('Erro de autenticação:', error);
	  res.status(500).json({ message: 'Erro de autenticação' });
	}
})


module.exports = router;