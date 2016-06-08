'use strict';

(function () {
  var _p = Promise;
  Promise = function Promise(p) {
    return new _p(p).catch(console.log.bind(console));
  };
  var _arr = ['all', 'race', 'resolve'];
  for (var _i = 0; _i < _arr.length; _i++) {
    var method = _arr[_i];
    Promise[method] = _p[method];
  }
})();