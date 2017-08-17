var express = require('express');
var router = express.Router();
var report = require('../model/report.server.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //  res.write(report.createReport());
    // res.end(report.createReport());
    report.createReport(function(doc) {
        res.write(doc);
        console.log(doc);
    });
    // res.end("");
    //res.render('./login/login', { "title": "login pager" });
});







module.exports = router;