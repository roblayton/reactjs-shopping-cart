var EventEmitter = require('events').EventEmitter;
var eventer = new EventEmitter();

exports.emit = function(name, key) {
  eventer.emit(name, null, key);
};

exports.on = function(name, callback) {
  eventer.on(name, callback);
};
