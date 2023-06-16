
const { Router } = require("express");
const router = Router();


router
.get("/",(req,res)=>{
	res.render("login",{title:"Authenticação"})
})
.post("/login", (req, res) => {
	const { username, password } = req.body; // Supondo que você esteja enviando o nome de usuário e a senha no corpo da solicitação

	// Aqui você pode adicionar a lógica para validar o usuário, verificar o nome de usuário e a senha em um banco de dados, por exemplo

	if (username == User.findAll({
		atributes: "usuario",
		where:{
			usuario: username}
	}) && password == User.findAll({
		atributes: "senha",
		where:{
			senha: password}})) {

		// Usuário válido
		//res.status(200).send("Usuário válido");
		res.redirect("/clients");
	} else {
		// Usuário  invalido
		res.status(401).send("Usuário inválido");
		res.render("login");
	}
})


module.exports = router;