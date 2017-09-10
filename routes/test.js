var express = require('express');
var session = require("express-session");
var bodyParser = require("body-parser");
var router = express.Router();
/*这是一个专门用于测试的类  */

router.get('/', function(req, res, next) {
    res.render('./test/index', { "title": "test" });
});


module.exports = router;