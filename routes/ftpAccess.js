/**
 * 数据文件ftp读写控制
 * 这个文件的功能是使服务器连接到总行的ftp服务器，读取ftp服务器上的所有文件，将日期最新的数据文件下载到本地
 * 其中，服务器上的文件夹分为两大类，分别是以：
 * yyyymmdd为文件夹名格式的
 * issYYYYMMDD为文件夹名格式的
 * 
 * 其中yyyymmdd为文件夹名格式的文件夹当中会有以下五个文件：
 * 1.c_brchno           机构表
 * 2.fc_balance_avg     存款日均-机构
 * 3.ifx_iss_cfmbusi    业务流水表
 * 4.ifx_iss_cust       客户属地表
 * 5.iss_filetf10       贸易融资流水-国结系统
 * 
 * 其中以issYYYYMMDD为文件夹名格式的文件夹中有以下两个文件
 * 1.ifx_iss_cfmbusi_ods 贸易融资事件档ods
 * 2.iss_filetf10_ods    贸易融资放款事件档ods
 * 
 * 
 * 
 * */
var express = require("express");
var router = express.Router();
var fs = require("fs");
var ftp = require("../tools/ftpClient");

var ftpClient = ftp.FtpClient().getInstance();


/**
 * 下载并保存文件到本地服务器
 */
router.get("/saveFtpFile", function(req, res, next) {
    // 取得服务器上所有的文件夹
    var folders;
    var foldersODS;
    var c = ftpClient;
    getFolders(ftpClient, function(list) {
        folders = list.folder;
        foldersODS = list.folderODS;
        // 对文件进行排序
        // sortFolders(folders);
        // sortFolders(foldersODS);
        // 取最近一天的文件
        lastDay_folder = folders[folders.length - 1];
        lastDay_folderODS = foldersODS[foldersODS.length - 1];

        // 先进行数据文件夹的日期校验
        if (lastDay_folder == lastDay_folderODS.slice(3, 11)) {
            // 创建服务器文件夹
            //  fs.rmdirSync('./public/dataBackUp/' + lastDay_folder);
            if (!fs.existsSync('./public/dataBackUp/' + lastDay_folder)) {
                fs.mkdir('./public/dataBackUp/' + lastDay_folder);
            }

            // 下载ods文件
            var ftpFolder = lastDay_folderODS;
            var localFolder = lastDay_folder;
            saveFtpFile(ftpClient, ftpFolder, localFolder, "ifx_iss_cfmbusi_ods");
            saveFtpFile(ftpClient, ftpFolder, localFolder, "iss_filetf10_ods");

            // 下载国结系统文件
            ftpFolder = lastDay_folder;
            saveFtpFile(ftpClient, localFolder, localFolder, "c_brchno");
            saveFtpFile(ftpClient, localFolder, localFolder, "fc_balance_avg");
            saveFtpFile(ftpClient, localFolder, localFolder, "ifx_iss_cfmbusi");
            saveFtpFile(ftpClient, localFolder, localFolder, "ifx_iss_cust");
            saveFtpFile(ftpClient, localFolder, localFolder, "iss_filetf10");
        } else {
            throw new Error('数据文件不齐全，取消下载！');
            return 0;
        }

    });
});


/**
 * 下载并保存文件到本地服务器
 */
router.get("/getFileSize", function(req, res, next) {
    getFileInfo('/20170103/c_brchno.dat');

});



/* 取得ftp服务器上所有的文件夹 */
/**
 * 取得ftp服务器上所有的文件夹
 * @param {*} cb 回调 函数
 * 
 */
function getFolders(ftpClient, cb) {
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
    return { folder: list_folder_sort, folderODS: list_folderODS_sort };
}


function saveFtpFile(ftpClient, ftpFolder, localFolder, file) {
    // var c = ftpClient;
    ftpClient.get('/' + ftpFolder + '/' + file + '.dat', function(err, stream) {
        if (err) {
            console.log('ftpclient get error');
            console.log(err);
        } else {
            // stream.setEncoding('UTF-8');
            stream.pipe(fs.createWriteStream('./public/dataBackUp/' + localFolder + '/' + file + '.dat', { start: 0, defaultEncoding: 'utf8' }));
        }
    });

}



module.exports = router;