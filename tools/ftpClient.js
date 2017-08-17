var ftp = require("ftp");
var config = require("../config/config");
var LZH = {
    FtpClient: function() {
        var me = this;
        var _instance;

        function init() {
            var client = new ftp();
            client.connect({
                host: config.jrrc_ftpParams.host,
                port: config.jrrc_ftpParams.port,
                user: config.jrrc_ftpParams.user,
                password: config.jrrc_ftpParams.password
            });
            return client;
        }

        return {
            getInstance: function() {
                if (!_instance) {
                    _instance = init();
                    return _instance;
                } else {
                    return _instance;
                }
            }
        };
    }
};

module.exports = LZH;