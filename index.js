const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
var methodOverride = require("method-override");
var path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");


// socketio 
const http = require('http');
const { Server } = require("socket.io");

var flash = require("express-flash");

const moment = require("moment");

const app = express();

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// flash message
app.use(cookieParser("CN-LEON-DX")); // random key :ơ]
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "CN-LEON-DX",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

database = require("./config/database");
database.connectDB();

const routeClient = require("./routers/client/index.route");
const routeAdmin = require("./routers/admin/index.route");

const port = process.env.PORT;

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");


// socketio
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
});

// end socketio

// use folder public
// tinymce
app.use(express.static(`${__dirname}/public`));
// end tinymce

// moment
app.locals.moment = moment;
// end moment
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// embed const route
routeClient(app);
routeAdmin(app);


app.get("*", (req, res) => {
  res.render("client/pages/errors/404", {
    pageTitle: '404 Not Found',
  });
})

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
