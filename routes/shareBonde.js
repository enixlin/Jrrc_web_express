var db = require("./mysql");
var express = require("express");
var router = express.Router();
var shareBonde = require("../model/shareBonde.server.nodel");

/* 与经营单位分成客户计价*/

router.get("/", function(req, res, next) {
    res.setHeader("Content-Type", "text/html");
    shareBonde.client.find(function(doc) {
        for (var item in doc) {
            res.write("id:" + item);
            for (var i in doc[item]) {
                res.write(
                    "  type:" + doc[item][i].type + "  precent:" + doc[item][i].precent
                );
            }
            res.write("</br>");
        }

        // console.log(doc);
        res.end("doc");
    });
});

/* 显示分成客户维护界面 */
router.get("/admin", function(req, res, next) {});

/* 分成客户维护：添加客户 */
router.get("/clientAdd", function(req, res, next) {
    var rule = {
        c_id: '222',
        type: 'jsh',
        precent: '40',
    }
    shareBonde.client.add(rule, function(doc) {
        console.log(doc);
    });
});

/* 分成客户维护：客户 */
router.post("/admin/add", function(req, res, next) {});

module.exports = router;