const app = require("./src/app.js");

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("http://127.0.0.1:" + port);
});