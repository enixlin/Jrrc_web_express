var express = require("express");
var fs = require("fs");
var ftp = require("../tools/ftpClient");
var router = express.Router();

/* GET users listing. */
router.get("/ftp", function(req, res, next) {
    res.setHeader(
        'Content-Type', 'text/html'
    );
    var list;
    /* 取得ftp服务器上所有的文件夹 */
    getFolders(function(folders) {
        var f1 = folders.folder;
        var f2 = folders.folderODS;
        console.log(typeof f1);
        console.log(f2.lenght);
        for (var item in f1) {
            res.write("foldername is :" + f1[item] + "</br>");
        }

        for (var item in f2) {
            res.write("foldername is :" + f2[item] + "</br>");
        }
        res.end("----------------------end--------------------------");
    });
});

/* 取得ftp服务器上所有的文件夹 */
function getFolders(cb) {
    var ftpClient = ftp.FtpClient().getInstance();
    var folder = [];
    var folderODS = [];
    ftpClient.list("/", function(err, result) {
        try {
            for (var item in result) {
                if (result[item].type == "d") {
                    if (result[item].name.slice(0, 3) == "iss") {
                        folderODS.push(result[item].name);
                    } else {
                        folder.push(result[item].name);
                    }
                }
            }
            // console.log(folder);
            cb({ folder: folder, folderODS: folderODS });
        } catch (error) {
            console.log(error);
        }
    });
}

/* 取得最近一天的数据文件夹 */
function chcekLastDayFile(list) {
    function numberorder(a, b) {
        return b.slice(4, 8) - a.slice(4, 8);
    }
    list.sort(numberorder);
    return list;
}

module.exports = router;