/**
 * 数据文件ftp读写控制
 * 这个文件的功能是使服务器连接到总行的ftp服务器，读取ftp服务器上的所有文件，将日期最新的数据文件下载到本地
 * 其中，服务器上的文件夹分为两大类，分别是以：
 * yyyymmdd为文件夹名格式的
 * issYYYYMMDD为文件夹名格式的
 * 其中yyyymmdd为文件夹名格式的文件夹当中会有以下五个文件：
 * 1.
 * 
 * */
var express = require("express");
var fs = require("fs");
var ftp = require("../tools/ftpClient");
var router = express.Router();

/* GET users listing. */
router.get("/ftp", function(req, res, next) {
    res.setHeader("Content-Type", "text/html");
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

/* 显示所有的文件夹 */
router.get('/showFtpFolders', function(req, res, next) {
    getFolders(function(folders) {
        var lastDayFolder = getLastDayFolder(folders);
        res.render('./ftpAccess/index', lastDayFolder);
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
            cb({ folder: folder, folderODS: folderODS });
        } catch (error) {
            console.log(error);
        }
    });
}
/* 对所有文件夹进行排序 */
function sortFolders(list) {
    function numberorder(a, b) {
        return b.slice(4, 8) - a.slice(4, 8);
    }
    list.sort(numberorder);
    return list;
}

/* 取得最近一天的数据文件夹 */
function getLastDayFolder(folders) {
    var list_folder_sort = sortFolders(folders.folder);
    var list_folderODS_sort = sortFolders(folders.folderODS);
    return { "folder": list_folder_sort, "folderODS": list_folderODS_sort };
}
module.exports = router;