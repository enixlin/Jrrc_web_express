/*
 * @Author: LINZHENHUAN 
 * @Date: 2017-08-02 16:30:51 
 * @Last Modified by: LINZHENHUAN
 * @Last Modified time: 2017-08-05 09:03:21
 */
var Tools = {
    /* 日期类工具 */
    Date: {
        getLastDay: function() {
            return Date();
        },
        getDateAtSeason: function(date) {
            var d = new Date(date);
            console.log("d is " + d);
            var month = d.getMonth() + 1;
            if (month == 1 || month == 2 || month == 3) {
                return 1;
            }
            if (month == 4 || month == 5 || month == 6) {
                return 2;
            }
            if (month == 7 || month == 8 || month == 9) {
                return 3;
            }
            if (month == 10 || month == 11 || month == 12) {
                return 4;
            }
            // return;
        },
        getYear: function(date) {
            return new Date(date).getYear();
        },
        getToday: function(dateFormat) {
            /* 返回的日期格式 */
            // 1.为'yyyyy-mm-dd'
            // 2.为'yyyyy/mm/dd'
            // 3.为'yyyyymmdd'
            var date = new Date();
            var year = date.getFullYear();
            var month = new Date().getMonth();
            var day = new Date().getDay();
            if (dateFormat == 1) {
                return year + "-" + month + "-" + month;
            }
            if (dateFormat == 2) {
                return year + "/" + month + "/" + month;
            }
            if (dateFormat == 3) {
                return year + "" + month + "" + month;
            }
        }
    },




    /**
     * 数组工具
     */
    Array: {
        /**
         *   数组工具
         *   each(ArrayObject, fn(e)) 
         *   遍历一维或多维数组，ArrayObject 要历遍的数组对象, fn 回调函数 e 返加数组的当前元素
         */
        each: function(ArrayObject, fn) {
            try {
                if (!count) {
                    var count = 0;
                }
                // 当数组的长度大于0且传入的参数为函数类型
                if (ArrayObject.length > 0 && fn.constructor == Function) {
                    // 循环数组的每项
                    while (count < ArrayObject.length) {
                        var e = array[count];
                        if (e && e.constructor == Array) {
                            LZH.arrayEach(e, fn);
                        } else {
                            fn.call(e, e);
                        }
                        count++;
                    }
                    count = null;
                }
            } catch (error) {
                console.log(error);
            }
            return this;
        }
    },

    /**
     * 接口类
     */
    Interface: {
        /**
         *      鸭式辨型法接口  Interface(name, method)
         *            一 、定义一个接口类基类
         *            接口类需要两个参数
         *            参数：1、接口的名字 name   字符串类型  
         *            参数：2、接口的方法 method 是一个数组
         */
        Interface: function(name, method) {
            var me = this;
            if (arguments.length != 2) {
                throw new Error(
                    "arguments is not match,should be 2 arguments.now is " +
                    arguments.length
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
        },

        /**
                检验接口里的方法 ensureImplements(object)
                object ：要检测的实例对象
                先判断接口检验函数接收参数是否满足个数要求
                最少要有一个对象和一个接口
                判断接口构造函数里是否全面实现接口实例类里的方法
                核心代码：检验接口里是否有相关方法，接口里相关的方法名称是否已实现为function
                */
        ensureImplements: function(object) {
            // 先判断接口检验函数接收参数是否满足个数要求
            // 最少要有一个对象和一个接口
            if (arguments < 2) {
                throw new Error("arguments is less 2");
            }
            // 获得接口实例对象，i从1开始，0是object
            for (var i = 1, len = arguments.length; i < len; i++) {
                var intanceInterface = arguments[i];
                //判断参数是否一个接口
                if (intanceInterface.constructor !== LZH.Interface) {
                    throw new Error(
                        "argument constructor is not a Interface constructor"
                    );
                }
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
        }
    }
};

module.exports = Tools;