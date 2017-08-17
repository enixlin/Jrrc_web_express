/* 
整个网站的会话管理类
*/
var express = require("express");
var session = require("express-session");
var router = express.Router();

/* creagte a session */
router.get("/*", function(req, res, next) {
  // 检查 session 中的 isVisit 字段
  // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
  if (req.session.isVisit) {
    req.session.isVisit++;
    res.send("<p>第 " + req.session.isVisit + "次来此页面</p>");
  } else {
    req.session.isVisit = 1;
    res.send("欢迎第一次来这里");
    console.log(req.session);
  }
});

module.exports = router;
