const app = require('./src/app');
require('dotenv').config();


const PORT = process.env.SERVER_PORT || 3000;

app.listen(3000, () => {
    console.log('http://127.0.0.1:' + PORT);
});