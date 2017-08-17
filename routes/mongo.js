var express=require('express');
var mongoose = require('mongoose');
var config = require('../config/config');
var session = require('express-session');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('./mongo/index', { "title": "mongo test pager" });
});






module.exports=router;