
const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkToken(req, res, next){

	const authHeader = req.headers['autorization']
	const token = authHeader && authHeader.split(" ")[1]

	if(!token){
		return res.send('Acesso negado!')
	}

	try {
		jwt.verify(token, process.env.SECRET);
		next();
	} catch (error) {
		console.log('Token invalido!')
	}
}


module.exports = {
	checkToken
}