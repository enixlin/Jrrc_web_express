/* 文件读写操作 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../config/config');

router.get('/', function(req, res, next) {

});

/* 读取文件 */
function readFile(path, cb) {
    var content = fs.readFileSync(path, 'utf-8');
    cb(content);
}




module.exports = router;