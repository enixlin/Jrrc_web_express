var config = require("../config/config");
var session = require("express-session");
var db = require("../routes/mysql");

var roler = {
  /**
 * fetch all the roler in this system
 *  
 * return:result(array)
 */
  getAllRole: function(cb) {
    var url = "select * from jrrc_roler";
    db.query(url, function(err, result) {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(result);
      }
    });
  },

  /**
   * add roler 
   * 
   * 
   */
  addRole: function(param, cb) {
    var role = JSON.parse(param);
    var url = "insert into jrrc_roler (role_name,status) values(?,1)";
    var args = [role.name];
    db.query(url, args, function(err, result) {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(result);
      }
    });
  },

  /**
   * delete roler 
   * 
   * 
   */
  deleteRoles: function(roles, cb) {
    var params = JSON.parse(roles);
    var resultCount="";
    for (var item in params) {
      var sql = "delete from jrrc_roler where id=?";
      var args = params[item].id;
      db.query(sql, args, function(err, result) {
        if (err) {
          console.log(err);
          resultCount+=err;
        } else {
            resultCount+=result;
        }
      });

    }
    cb(resultCount);
  },

  /**
   * modify roles
   * 
   * 
   */
  modifyRoles: function(roles, cb) {
    var params = JSON.parse(roles);
    var resultCount="";
    for (var item in params) {
      var sql = "update jrrc_roler set role_name=?,status=? where id=?";
      var role_name = params[item].role_name;
      var id = params[item].id;
      var status = params[item].status;
      var args = [role_name, status, id];
      db.query(sql, args, function(err, result) {
        if (err) {
          console.log(err);
           resultCount+=err;
        } else {
           resultCount+=result;
        }
      });
    }
    cb(resultCount);
  }
};

module.exports = roler;
