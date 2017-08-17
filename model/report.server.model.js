var express = require("express");
var util = require("../tools/utils");
var db = require("../routes/mysql");

var ReportBase = function(name) {
    this.name = name;
};
ReportBase.prototype.create = function() {
    return this.name;
};

var Report_jsl = function(name) {
    this.name = name;
};

util.CLASS.Extend(ReportBase, Report_jsl);

var report = {
    createReport: function(cb) {
        var r = new Report_jsl("国际结算报表");
        return r.create();

    }
};

module.exports = report;