var config = require("../config/config");
var session = require("express-session");
var db = require("../routes/mysql");

var shareBonde = {
    client: {
        add: function(rule, cb) {
            this.find(function(result) {
                for (var item in result) {
                    if (
                        result[item].c_id == rule.c_id &&
                        result[item].type == rule.type
                    ) {
                        throw new Error("分配项目已存在！");
                        cb("添加失败，分配项目已存在！");
                    } else {
                        var sql =
                            "insert into jrrc_shareBondeClient (c_id,type,precent) values(?,?,?)";
                        var args = [rule.c_id, rule.type, rule.precent];
                        db.query(sql, args, function(err, result) {
                            err ? cb(err) : cb(result);
                        });
                    }
                }
            });
        },
        update: function() {},
        delete: function() {},
        // 查找客户
        find: function(cb) {
            var sql = "select * from jrrc_shareBondeClient";
            db.query(sql, function(err, result) {
                if (err) {
                    console.log(err);
                    throw new Error("查询客户有误：" + err);
                }
                cb(result);
            });
        }
    },

    report: {
        create: function(client, prior) {
            var sql = "";
        }
    }
};

module.exports = shareBonde;