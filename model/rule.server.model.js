var config = require("../config/config");
var session = require("express-session");
var db = require("../routes/mysql");
var util = require('../tools/utils');

/* 功能类 */
var rule = {
    /* 取得所有的功能 */
    getAllRules: function(cb) {
        var sql = "select * from jrrc_rule_n";
        db.query(sql, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },

    /**
     * 生成功能树
     */
    makeRuleTree: function(cb) {
        this.getAllRules(function(result) {
            var array = [];
            for (var item in result) {
                array.push({ id: result[item].id, name: result[item].name, url: result[item].url, status: result[item].status, pid: result[item].pid });
            }
            var tree = util.Array.toTree(array, ['pid', 'id']);
            cb(tree);
            // var array = [];
            // // result是一个对象
            // for (var item in result) {
            //     // console.log("item is :" + item);
            //     console.log("reord is :" + result[item]);
            //     //  array[item]
            //     result[item].children = [];
            //     result[item].type = "";
            //     if (result[item].pid == 6) {
            //         result[0].children.push(result[item]);
            //     }
            // }
            // // console.log(result);
        });
    },

    /* 添加功能 */
    addRule: function(records, cb) {
        var params = JSON.parse(records);
        var sql = "insert into jrrc_rule_n (name,url,pid) values(?,?,?)";
        var name = params.name;
        var url = params.url;
        var pid = params.pid;
        var args = [name, url, pid];
        db.query(sql, args, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },

    /* 修改功能 */
    modifyRule: function(records, cb) {
        var param = JSON.parse(records);
        var count;
        for (var item in param) {
            var params = param[item];
            var sql = "update jrrc_rule_n set name=?,url=?,pid=?,level=? where id=?";
            var name = params.name;
            var url = params.url;
            var pid = params.pid;
            var level = params.level;
            var id = params.id;
            var args = [name, url, pid, level, id];
            db.query(sql, args, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    count++;
                }
            });
        }
        cb(count);
    },

    /* 删除权限  */
    deleteRule: function(records, cb) {
        var param = JSON.parse(records);
        var count;
        for (var item in param) {
            var params = param[item];
            var sql = "delete  from jrrc_rule_n where id=?";
            var id = params.id;
            var args = [id];
            db.query(sql, args, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    count++;
                }
            });
        }
        cb(count);
    }
};

module.exports = rule;