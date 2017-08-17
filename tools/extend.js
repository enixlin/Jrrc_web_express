/* 单继承 */
var Extend = function(superClass, subClass) {
    var F = new Function();
    F.prototype = sup.prototype;
    sub.prototype = new F();
    // 还原子类的构造器
    sub.prototype.constructor = sub;
    // 保存一下父类的原型对象
    sub.SuperClass = sup.prototype;
};

/* .多继承 */
var mix = function() {
    var i = 1,
        len = arguments.length,
        target = arguments[0],
        arg;
    for (; i < len; i++) {
        arg = arguments[i];
        //遍历被继承对象中的属性
        for (var property in arg) {
            // 将被继承对象中的属性复制到目标对象中
            target[property] = arg[property];
        }
    }
    return target;
};