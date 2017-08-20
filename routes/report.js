var express = require('express');
var router = express.Router();
var report = require('../model/report.server.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    report.createReport(function(doc) {
        res.write(doc);
        console.log(doc);
    });
});
/**
 * this is a 
 */
module.exports = router;