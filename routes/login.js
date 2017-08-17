var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('./login/login', { "title": "login pager" });
});

//退出登录
router.get('/logout', function (req, res, next) {
  req.session.loginUser=null;
  res.redirect('/login');
});





module.exports = router;