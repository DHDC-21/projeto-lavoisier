const app = require('./src/app.js');
require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;
server.listen(PORT, () => {
    console.log('http://127.0.0.1:' + port);
});