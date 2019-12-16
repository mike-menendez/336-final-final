var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("index.html");
});

router.get('/rubric', function(req, res, next) {
    res.render("rubric.html");
});

module.exports = router;