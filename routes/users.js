var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var router = express.Router();

var user = require("../model/users.server.model");



router.get("/getAvailableUsersNames", function(req, res, next) {
    user.getAvailableUsersNames(function(doc) {
        res.json(doc);
    });

});

router.get("/getAllUsersNames", function(req, res, next) {
    user.getAllUsersNames(function(doc) {
        res.json(doc);
    });
});

// 修改用户信息，如果修改成功就返回修改后的用户信息
router.post("/modifyUserInfo", function(req, res, next) {
    // var users=eval("("+req.body+")");
    var users = req.body.user;
    console.log("req.body is", users);
    console.log("users type is", typeof users);
    user.modifyUserInfo(users, function(doc) {
        res.json(doc);
    });
});

// 验证密码
router.post("/valitPassword", function(req, res, next) {
    user.valitPassword(req.body, function(result) {
        req.session.loginUser = result;
        res.json(result);
    });
});

// 显示新增用户界面
router.get("/", function(req, res, next) {
    res.render("./users/index", { title: "用户管理" });
});

// 处理新增用户
router.post("/addUser", function(req, res, next) {
    var params = req.body;
    user.addUser(params, function(doc) {
        res.json(doc);
    });
});

// 取得所有用户
router.get("/getAllUsers", function(req, res, next) {
    user.getAllUsers(function(doc) {
        res.json(doc);
    });
});

//删除用户
router.post("/deleteUsers", function(req, res, next) {
    //var params =eval("("+req.body.user+")") ;
    var params = req.body.user;
    console.log("run in router:", params);
    user.deleteUsers(params, function(doc) {
        res.json(doc);
    });
    user.de
});

//用户角色设置界面
router.get("/setUserRoles", function(req, res, next) {
    res.render("./users/userRoles", { title: "用户角色管理" });
});

//取得所有的用户角色
router.get("/getAllUserRole", function(req, res, next) {
    user.getAllUserRole(function(doc) {
        res.json(doc);
    });
});

//用户角色新增
router.get("/addUserRoles", function(req, res, next) {
    var userId = req.body.userRole.userId;
    var roleId = req.body.userRole.roleId;
    user.addUserRoles(userId, roleId, function(doc) {
        res.json(doc);
    });
});

module.exports = router;