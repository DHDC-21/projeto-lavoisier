
const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkAuthCookie(req, res, next) {
	const authCookie = req.cookies.auth_token;
  
	if (!authCookie) {
	  return res.redirect('/login'); // Redireciona para a tela de login se não houver cookie
	}
  
	try {
	  jwt.verify(authCookie, process.env.SECRET);
	  next(); // Continue para a rota protegida
	} catch (error) {
	  res.redirect('/login'); // Redireciona para a tela de login se o cookie for inválido
	}
  }
  
  



module.exports = {
	checkAuthCookie,
}