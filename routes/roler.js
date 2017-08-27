var express = require("express");
var router = express.Router();
var roler = require("../model/roler.server.model");

/**
 * 显示角色维护界面
 */
router.get("/", function(req, res, next) {
    res.render("./roler/index", { title: "角色管理" });
});

/**
 * 取得所有的用户角色
 */
router.get("/getAllRole", function(req, res, next) {
    // var role=req.body.rolers;
    roler.getAllRole(function(doc) {
        res.json(doc);
    });
});

/**
 * 添加角色
 */
router.post("/addRole", function(req, res, next) {
    var role = req.body.rolers;
    roler.addRole(role, function(doc) {
        res.json(doc);
    });
});

/**
 * 删除角色
 */
router.post("/deleteRole", function(req, res, next) {
    var role = req.body.rolers;
    roler.deleteRoles(role, function(doc) {
        res.json(doc);
    });
});




/**
 * 修改角色
 */
router.post("/modifyRole", function(req, res, next) {
    var role = req.body.rolers;
    roler.modifyRoles(role, function(doc) {
        res.json(doc);
    });
});

module.exports = router;