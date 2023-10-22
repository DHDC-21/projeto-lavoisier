
const app = require('./src/app.js')
require('dotenv').config();

const PORT = process.env.SERVER_PORT || 4444;

app.listen(PORT, ()=>{
	console.log('Servidor rodano no endereço \nhttp://127.0.0.1:' + PORT);
})