//set up mySql connection
require('dotenv').config();

var mySql = require("mysql");

//used to set up Heroku/JawsDB connection
if (process.env.JAWSDB_URL) {
    connection = mySql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mySql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root1234",
        database: "burgers_db"
    });
};


// Make connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;