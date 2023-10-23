
const app = require('./src/app.js');
require("dotenv").config();	//* essa linha tem que vir apos o app

const PORT = process.env.SERVER_PORT || 4444;

app.listen( PORT , (error) => {
	try{
		console.log('Servidor rodano no endereço: (http://127.0.0.1:' + PORT + ')');
	}
	catch{
		console.log(error);
	}
});