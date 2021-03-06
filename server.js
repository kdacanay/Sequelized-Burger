//Require the following npm packages inside of the server.js file:

var express = require("express");
var exphbs = require("express-handlebars");
var _handlebars = require("handlebars");
var {
    allowInsecurePrototypeAccess
} = require("@handlebars/allow-prototype-access");

var db = require('./models');

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.engine("handlebars", exphbs({
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    defaultLayout: "main",
    extname: 'handlebars',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controllers.js");

app.use(routes);

// // Start our server so that it can begin listening to client requests.
// app.listen(PORT, function () {
//     // Log (server-side) when our server has started
//     console.log("Server listening on: http://localhost:" + PORT);
// });
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log('listening on port', PORT);
    });
});