var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/dashboard', function(req, res, next) {
    res.render("dashboard.html");
});

router.post('/add', function(req, res, next) {
    var connection = mysql.createConnection({
        host: "b4e9xxkxnpu2v96i.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "iwn4gjz7ymvpr6fq",
        password: "iavl3w3xoaemrmmc",
        database: "oia3z2rlvk31por6"
    });

    connection.connect();
    console.log("req body: ", req.body);
    connection.query("INSERT INTO time_block (day, stime, etime, uuid) VALUES (?, ?)", [req.body.d, req.body.s, req.body.e,
        connection.query("SELECT uuid from users WHERE uname = ?"), [req.body.u], (err, r) => { return r[0]; }
    ], (e) => {
        if (e) {
            console.log("error connecting to db or running query: ", e);
            throw e;
        }
        connection.end();
    }).then(() => {
        res.json({ valid: "ok" });
    }).catch((err) => {
        console.log("error creating user: ", err);
        throw err;
    });
});

module.exports = router;