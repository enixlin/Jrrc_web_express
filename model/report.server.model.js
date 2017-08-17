var express = require('express');
var util = require('../tools/utils')

var CompositeInterface = new util.Interface.Interface('Composite', ['addChild', 'getChild']);
util.Interface.ensureImplements(CompositeInterface);

report = {

}



module.exports = LZH;