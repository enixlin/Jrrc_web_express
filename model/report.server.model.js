var express = require("express");
var util = require("../tools/utils");
var db = require("../routes/mysql");

var ReportBase = function(name) {
    this.name = name;
};
ReportBase.prototype.create = function(cb) {
    // console.log(db);
    var sql = "select * from jrrc_user";
    db.query(sql, function(err, result) {
        // console.log(result);
        util.Array.each(result, function(e) {
            // console.log(e.name);
            cb(e.name);
        });
    });
    //return this.name;
};

var Report_jsl = function(name) {
    this.name = name;
};

util.CLASS.Extend(ReportBase, Report_jsl);

var report = {
    createReport: function(cb) {
        db.query
        var r = new Report_jsl("国际结算报表");
        r.create(function(result) {
            cb(result);
        });

    }
};

module.exports = report;