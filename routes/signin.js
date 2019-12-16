var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var mysql = require('mysql');

bcrypt.hash("hashbrown", 10);

/* GET auth page. */
router.get('/', function(req, res, next) {
    res.render("auth.html");

});

router.post('/register', function(req, res, next) {
    bcrypt.hash("hashbrown", 10)
        .then(function(hashed) {
            req.body.pass = hashed;

            var connection = mysql.createConnection({
                host: "b4e9xxkxnpu2v96i.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
                user: "iwn4gjz7ymvpr6fq",
                password: "iavl3w3xoaemrmmc",
                database: "oia3z2rlvk31por6"
            });

            connection.connect();
            console.log("req body: ", req.body);
            connection.query("INSERT INTO users (uname, pass) VALUES (?, ?)", [req.body.uname, req.body.pass], (e) => {
                if (e) {
                    console.log("error connecting to db or running query: ", e);
                    throw e;
                }
            });
            connection.end();
        }).then(() => {
            res.json({ valid: "ok" });
        }).catch((err) => {
            console.log("error creating user: ", err);
            throw err;
        });
});

router.post('/', function(req, res, next) {
    var connection = mysql.createConnection({
        host: "b4e9xxkxnpu2v96i.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "iwn4gjz7ymvpr6fq",
        password: "iavl3w3xoaemrmmc",
        database: "oia3z2rlvk31por6"
    });

    connection.connect();

    connection.query("SELECT pass FROM users WHERE uname = ?", [req.body.username], function(err, results) {
        if (err) {
            console.log("err: ", err);
            throw err;
        }
        console.log("passed init err ");
        console.log("results: ", JSON.parse(results).pass);

        if (bcrypt.compare(req.body.password, JSON.parse(results).pass)) {
            console.log("bcrypt comparison pass");
            res.json({ valid: "ok" }).status(200);
        } else {
            console.log("bcrypt comparison FAILED");
            res.json({ valid: "false" }).status(200);
        }
    });
});

module.exports = router;