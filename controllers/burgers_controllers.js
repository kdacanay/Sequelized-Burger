//import the following: Express, burger.js
//create the router for the app, export at end


var express = require("express");

var router = express.Router();

//import the model burgers.js to use database
var burger = require("../models/burger.js");


//create routes, index
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

//create: post route and then redirect to /index
router.post("/burgers/create", function (req, res) {
    burger.insertOne([
        'burger_name', 'devoured'
    ], [
        req.body.burger_name, req.body.devoured
    ], function () {
        res.redirect("/");
    });
});

// update: put route and return to index 
router.put("/burgers/update/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.updateOne({
            devoured: req.body.devoured
        }, condition,
        function (result) {
            if (result.changedRows == 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
});

// export routes for server.js to use
module.exports = router;