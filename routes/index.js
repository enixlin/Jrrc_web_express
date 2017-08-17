var express = require('express');
var router = express.Router();
var tools = require('../tools/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* test util.js */
router.get('/testUtil', function(req, res, next) {
    res.end("" + tools.Date.getDateAtSeason("2017/07/01"));
});



module.exports = router;