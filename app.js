
const express = require("express");
//const flash = require("connect-flash")
const morgan = require("morgan");
const path = require("path");
//const session = require("express-session")

const mainRoutes = require("./src/controllers/routes/auth.routes");
const authRoutes = require("./src/controllers/routes/main.routes");


const User = require('./src/models/User');
const Client = require('./src/models/Client');


require("dotenv").config();
const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static('./public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(express.json());
app.use(morgan("short"));

app.use(express.urlencoded({ extended: false }));

/*
app.use(session({
	secret: "eletiva-script",
	resave: true,
	saveUninitialized: true
}));	// o flash tem que vir obrigatoriamente a baixo do session
app.use(flash());

// middleware
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg  = req.flash("error_msg");
	next();
})
*/

app.use("/", mainRoutes);
app.use("/auth", authRoutes);


app.listen(process.env.PORT, () => {
    console.log("http://127.0.0.1:" + process.env.PORT);
})