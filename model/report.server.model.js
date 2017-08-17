var express = require('express');
var util = require('../tools/utils')

var CompositeInterface = new util.Interface.Interface('Composite', ['addChild', 'getChild']);

var CompositeImplement = function(name) {
    this.children = [];
    this.name = name;
}

/*  */
CompositeImplement.prototype.addChild = function(name) {

    }
    // 取得所有子节点
CompositeImplement.prototype.getChild = function() {
    return this.children;
}

report = {

}



module.exports = LZH;