
const User = require("../../models/User");

const loginPost = (req, res) => {
	const { username, password } = req.body; // Supondo que você esteja enviando o nome de usuário e a senha no corpo da solicitação

	// Aqui você pode adicionar a lógica para validar o usuário, verificar o nome de usuário e a senha em um banco de dados, por exemplo

	if (username == User.findAll({where:username}) && password == User.findAll({where:password})) {
		// Usuário válido
		res.status(200).send("Usuário válido");
		res.render("home");
	} else {
		// Usuário  invalido
		res.status(401).send("Usuário inválido");
		res.render("login");
	}
};

module.exports = loginPost;