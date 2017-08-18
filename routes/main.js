var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
    //console.log(req.session.loginUser);
    var user = req.session.loginUser;
    console.log(user);
    res.render('./main/index', user);

});

module.exports = router;