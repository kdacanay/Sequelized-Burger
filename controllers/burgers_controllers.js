//import the following: Express, burger.js
//create the router for the app, export at end


var express = require("express");

var router = express.Router();

var db = require('../models')


//create routes, index
router.get("/", function (req, res) {
    // console.log(req);
    //sequelize
    db.Burger.findAll()
        .then(function (data) {
            console.log(data);
            // console.log("============", data[2])
            var hbsObject = {
                burgers: data
            };
            return res.render("index", hbsObject);
        })
});

//create: post route and then redirect to /index
router.post("/burgers/create", function (req, res) {
    db.Burger.create({
            burger_name: req.body.burger_name
        })
        .then(function (data) {
            console.log(data);
            res.redirect('/');
        })
});

// update: put route and return to index 
router.put("/burgers/update/:id", function (req, res) {
    db.Burger.update({
        devoured: true
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (data) {
        res.json('/');
    });
});

// export routes for server.js to use
module.exports = router;