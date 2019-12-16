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
            req.pass = hashed;

            var connection = mysql.createConnection({
                host: "b4e9xxkxnpu2v96i.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
                user: "iwn4gjz7ymvpr6fq	",
                password: "iavl3w3xoaemrmmc",
                database: "oia3z2rlvk31por6"
            });

            connection.connect();

            connection.query("INSERT INTO users ", [req.user, req.pass], (e) => {
                console.log("error connecting to db or running query: ", e);
                throw e;
            });
        }).then(() => {
            res.send();
        }).catch((err) => {
            console.log("error creating user: ", err);
            throw err;
        });
});

router.post('/', function(req, res, next) {
    var connection = mysql.createConnection({
        host: "b4e9xxkxnpu2v96i.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "iwn4gjz7ymvpr6fq	",
        password: "iavl3w3xoaemrmmc",
        database: "oia3z2rlvk31por6"
    });

    connection.connect();

    connection.query("SELECT pass FROM users WHERE uname = ?", [req.uname], function(err, results) {
        if (err) {
            console.log("err: ", err);
            throw err;
        }

        if (bcrypt.compare(req.pass, JSON.stringify(results).pass)) {
            res.send("ok");
        } else {
            res.status(403).send("bad");
        }
    });
});

module.exports = router;