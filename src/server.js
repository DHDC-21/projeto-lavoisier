//src/@server.js

const app = require("../app"); //! importação das configurações do app
require("dotenv").config();

app.listen(process.env.PORT, () => {
    console.log("http://127.0.0.1:" + process.env.PORT);
});