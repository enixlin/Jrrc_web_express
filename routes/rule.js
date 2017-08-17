var express = require("express");
var router = express.Router();
var rule = require("../model/rule.server.model");

/**
 * 显示权限管理维护界面
 */
router.get("/", function(req, res, next) {
    res.render("./rule/index", { title: "权限管理" });
});

/**
 * 取得所有的权限
 */
router.get("/getAllRule", function(req, res, next) {
    rule.getAllRules(function(doc) {
        res.json(doc);
    });

});

/**
 * 添加权限管理
 */
router.post("/addRule", function(req, res, next) {
    var rules = req.body.rule;
    rule.addRule(rules, function(doc) {
        res.json(doc);
    });
});

/**
 * 删除权限
 */
router.post("/deleteRule", function(req, res, next) {
    var rules = req.body.rule;
    rule.deleteRule(rules, function(doc) {
        res.json(doc);
    });
});

/**
 * 修改权限管理
 */
router.post("/modifyRule", function(req, res, next) {
    var rules = req.body.rule;
    rule.modifyRule(rules, function(doc) {
        res.json(doc);
    });
});

module.exports = router;