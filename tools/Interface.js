/* 鸭式辨型法接口  */
/* 接口类 */

/* 
一 、定义一个接口类基类
接口类需要两个参数
参数：1、接口的名字 name     
参数：2、接口的方法 method

*/
var LZH = {};
LZH.Interface = function(name, method) {
    var me = this;
    if (arguments.length != 2) {
        throw new Error(
            "arguments is not match,should be 2 arguments.now is " + arguments.length
        );
    }
    me.name = name;
    me.method = [];
    for (var i = 0, len = method.length; i < len; i++) {
        if (typeof method[i] != "string") {
            throw new Error(
                "method name should be typeof String,now is " + typeof method[i]
            );
        }
        me.method.push(method[i]);
    }
};

/* 二、检验接口里的方法 */
LZH.Interface.ensureImplements = function(object) {
    // 先判断接口检验函数接收参数是否满足个数要求
    // 最少要有一个对象和一个接口
    if (arguments < 2) {
        throw new Error("arguments is less 2");
    }
    // 获得接口实例对象，i从1开始，0是object
    for (var i = 1, len = arguments.length; i < len; i++) {
        var intanceInterface = arguments[i];
        alert("intanceInterface is :" + intanceInterface);
        //判断参数是否一个接口
        if (intanceInterface.constructor !== LZH.Interface) {
            throw new Error("argument constructor is not a Interface constructor");
        }
        alert("check3");
        // 判断接口构造函数里是否全面实现接口实例类里的方法
        for (var j = 0, len = intanceInterface.method.length; j < len; j++) {
            var methodName = intanceInterface.method[j];
            // 核心代码：检验接口里是否有相关方法，接口里相关的方法名称是否已实现为function
            if (!object[methodName] || typeof object[methodName] !== "function") {
                throw new Error(
                    "methodName not exist in object ,or methodName not a function"
                );
            }
        }
    }
};