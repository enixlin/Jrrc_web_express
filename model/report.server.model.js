var express = require("express");
var util = require("../tools/utils");
var db = require("../routes/mysql");

// var ReportBase = function(name) {
//     this.name = name;
// };
// ReportBase.prototype.create = function(cb) {
//     // console.log(db);
//     var sql = "select * from jrrc_user";
//     db.query(sql, function(err, result) {
//         // console.log(result);
//         util.Array.each(result, function(e) {
//             // console.log(e.name);
//             cb(e.name);
//         });
//     });
//     //return this.name;
// };

// var Report_jsl = function(name) {
//     this.name = name;
// };

// util.CLASS.Extend(ReportBase, Report_jsl);

/* 报表抽象工厂 */
var ReportFactory = function(SubClass, SuperClass) {
    // 判断抽象工厂中是否有该抽象类
    if (typeof ReportFactory[SuperClass] === "function") {
        //缓存类
        function F() {}
        // 继承父类的属性和方法
        F.prototype = new ReportFactory[SuperClass]();
        // 还原子类的构造函数
        SubClass.constructor = SubClass;
        SubClass.prototype = new F();
    } else {
        throw new Error("未创建该抽象类");
    }
};

/* 国际结算量报表抽象类 */
ReportFactory.JSL = function() {
    this.type = "JSL";
};
Report_jsl.prototype = {
    create: function(name, startDay, endDay) {
        throw new Error("抽象方法不能调用");
    }
};

/* 部室国际结算报表实现类 */
var report_JSL_department = function(name, type, startDay, endDay) {
    this.name = name;
    this.type = type;
    this.startDay = startDay;
    this.endDay = endDay;
    this.tasks = {};
};
ReportFactory(report_JSL_department, "JSL");
report_JSL_department.prototype = {
    constructor: report_JSL_department,
    create: function() {},
    getTasks: function() {}
}
var report = {
    createReport: function(cb) {
        var r = new Report_jsl("国际结算报表");
        r.create(function(result) {
            cb(result);
        });
    }
};

module.exports = report;