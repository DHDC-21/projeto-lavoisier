
const express = require('express');
const router = express.Router();


router
 .get('/', (req,res)=>{
	res.render('index',{title:'Menu Inicial'});
 })
 .get("/home", (req,res)=>{
	res.redirect("/");
})

 .get('/teste', (req,res)=>{
	res.render('teste',{title:'Testando'});
 })
 .post('/teste', (req,res)=>{
	/*
	const username = req.body.username;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin === "on"; // Verifica se a caixa de seleção foi marcada
	*/

	const {
		inputUsername,
		inputPassword,
		isAdmin
	} = req.body;

    // Faça algo com os valores capturados, como salvá-los no banco de dados
	console.log("Novo Usuario Criado!")
    console.log("Nome de Usuário:", inputUsername);
    console.log("Senha:", inputPassword);
    console.log("É Administrador?", isAdmin);

    res.send(
		"Cadastro realizado com sucesso!" +
		"\n Nome de Usuário:" + inputUsername +
    	"\n Senha:"+ inputPassword +
    	"\n É Administrador?"+ isAdmin
		);
 })


module.exports = router;