//加载mysql模块
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'jrrc'
});

 connection.connect();


module.exports = connection;