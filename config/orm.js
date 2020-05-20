//Create an orm.js file inside config directory.
//Import (require) connection.js into orm.js
//In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.
//selectAll()
//insertOne()
//updateOne()
//Export the ORM object in module.exports.

//import connection.js

var connection = require("../config/connection.js");

//pass 3 values int mySQL query
//to write query, we need 3 questions marks
//loop through and create an array of question marks and turns into string
// ['?','?','?'].toString => '?,?,?'

function productQuestionMarks(number) {
    var questArray = [];
    for (var i = 0; i < number; i++) {
        questArray.push("?");
    }
    return questArray.toString();
}
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {

        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

//object for all SQL statement functions
var orm = {

    selectAll: function (tableInput, callBack) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw (err);
            }
            callBack(result);
        });
    },
    insertOne: function (table, columns, values, callback) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += columns.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += productQuestionMarks(values.length);
        queryString += ")";

        console.log(queryString);

        connection.query(queryString, values, function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        })
    },
    updateOne: function (table, objColVals, condition, callback) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        })
    }

}

module.exports = orm;