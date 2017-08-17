
/*
服务器配置参数文件
*/
module.exports = {
    // web服务监听端口
    port: 80,
    // 数据库连接参数
    db: "mongodb://localhost/jrrc",
    // ftp服务器登录参数
    ftpParams: {
        host: 'localhost',
        port: '21',
        user: 'linzhenhuan',
        password: 'enixlin1981'
    },
     // ftp服务器登录参数
    jrrc_ftpParams: {
        host: '141.0.189.69',
        port: '21',
        user: 'gj',
        password: 'gj'
    },
    //ftp服务器数据文件保存路径
    dataPath:{
        dir:"/data"
    }
}