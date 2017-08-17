var LZH = {};
// LZH.Interface = function(name, method) {
//   /* 检测传入的参数个数，至少要有两个参数，一个是类的名字，另一个是方法名称数组 */
//   if (arguments < 2) {
//     throw new Error("arguments is less 2");
//   }
// var name=name;
// var method=[];
// /* 历遍所有的方法，因为方法名称数组是第二个参数，所以i从1开始 */
// for(var i=0,len=arguments[1].lenght;i<len;i++){

// }
// };

/* 创建一个报表接口 */
/* 
报表的接口：
功能：
1、根据数据生成报表
2、展示报表    

*/

/* 报表基类 */

// 业务系统设计
// 1、主体：经营主体，客户

var ReportInterface = function(name, method) {
    var me = this;
    /* 检测接口的参数是否齐全 */
    if (arguments.length != 2) {
        throw new Error("arguments is less 2");
    }
    me.name = name;
    me.method = [];
    for (var i = 0, len = method.length; i < len; i++) {
        if (typeof method[i] != 'string') {
            throw new Error('method name should be typeof String,now is ' + typeof(method[i]));
        }
        me.method.push(method[i]);
    }
    return this;
};