//import ORM to create functions that will interact w/database
var orm = require("../config/orm.js");
//ORMs selectAll, insertOne,updateOne
//Also inside burger.js, create the code that will call the ORM functions using burger specific input for the ORM.
var burger = {
    selectAll: function (callback) {
        orm.selectAll("burgers", function (response) {
            callback(response)
        });
    },
    // variables columnss and valuess are arrays
    insertOne: function (columns, values, callback) {
        orm.insertOne("burgers", columns, values, function (response) {
            callback(response);
        });
    },
    updateOne: function (objColVals, condition, callback) {
        orm.updateOne("burgers", objColVals, condition, function (response) {
            callback(response);
        });
    }
}

module.exports = burger;