var config = require("../config/config");
var session = require("express-session");
var db = require("../routes/mysql");

/*
********************************
用户管理
********************************
*/
var user = {
    // 修改用户信息
    modifyUserInfo: function(param, cb) {
        var result = { success: 0, fail: 0 };
        var params = JSON.parse(param);
        for (var item in params) {
            var record = params[item];
            var sql = "update jrrc_user set name=?,password=?,status=? where id=?";
            var args = [record.name, record.password, record.status, record.id];
            db.query(sql, args, function(err, doc) {
                if (err) {
                    console.log(err);
                    result.fail++;
                } else {
                    result.success++;
                }
            });
            //console.log('result is :', result);
        }
        cb(result);
    },

    // 取得所有正在使用的用户的用户名和编号
    getAvailableUsersNames: function(cb) {
        this.getAllUsers(function(Users) {
            var userIdName = new Array();
            for (var item in Users) {
                if (Users[item].status == 1) {
                    userIdName.push({ id: Users[item].id, name: Users[item].name });
                }
            }
            cb(userIdName);
        });
    },

    // 取得所有用户的全部信息，包含用户名，编号，密码等
    getAllUsers: function(cb) {
        var result = { success: 0, fail: 0 };
        var sql = "select * from jrrc_user";
        db.query(sql, function(err, doc) {
            if (err) {
                result.fail++;
                // cb(result + ":" + err);
            } else {
                //console.log(doc);
                cb(doc);
            }
        });
    },

    // 添加用户
    addUser: function(user, cb) {
        var result = { success: 0, fail: 0 };
        var sql = "insert into jrrc_user (name,password,status) values(?,?,?)";
        var arg = [user.name, user.password, 1];
        db.query(sql, arg, function(err, doc) {
            if (err) {
                result.fail++;
                cb(result + ":" + err);
            } else {
                //console.log(doc);
                cb(doc);
            }
        });
    },

    //验证用户密码
    valitPassword: function(userInfo, cb) {
        this.getAllUsers(function(Users) {
            for (var item in Users) {
                if (
                    userInfo.id == Users[item].id &&
                    userInfo.password == Users[item].password
                ) {
                    var user_info = {};
                    user_info.name = Users[item].name;
                    user_info.id = Users[item].id;
                    return cb(user_info);
                }
            }
            return cb({ result: "false" });
        });
    },

    //删除用户
    deleteUsers: function(param, cb) {
        var result = { success: 0, fail: 0 };
        var params = JSON.parse(param);
        for (var item in params) {
            // var record = eval("(" +params[item]+")" );
            console.log("run in model:" + params);
            console.log("==============================================:");
            console.log("param[item],id is:" + params[item].id);
            var sql = "delete from jrrc_user where id=?";
            var args = params[item];
            console.log("args is:" + args.id);
            db.query(sql, args.id, function(err, doc) {
                if (err) {
                    result.fail++;
                } else {
                    result.success++;
                }
            });
        }
        cb(result);
    },

    getAllUsersNames: function(cb) {
        this.getAllUsers(function(Users) {
            var userIdName = new Array();
            for (var item in Users) {
                userIdName.push({ id: Users[item].id, name: Users[item].name });
            }
            cb(userIdName);
        });
    },

    /* 取得所有的用户角色 */
    getAllUserRole: function(cb) {
        var sql = "select * from jrrc_role_user";
        db.query(sql, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },

    //设置用户的角色
    addUserRoles: function(userId, roleId, cb) {
        var sql = "insert into jrrc_role_user (role_id,user_id) values(?,?)";
        var args = [roleId, userId];
        db.query(sql, args, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    }
};

module.exports = user;