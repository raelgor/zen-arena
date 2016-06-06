'use strict';

var zlb = require('zenx-lb');
var log = require('./log');

module.exports = function (clientConfig) {

   log('Initializing balancer...');

   var lb = new zlb.LoadBalancer({
      host: clientConfig.config.bind_ip,
      port: clientConfig.config.port,
      protocol: clientConfig.config.protocol,
      ssl: {
         key: clientConfig.config.ssl.key,
         cert: clientConfig.config.ssl.cert,
         passphrase: clientConfig.config.ssl.passphrase
      }
   });

   var _iteratorNormalCompletion = true;
   var _didIteratorError = false;
   var _iteratorError = undefined;

   try {
      for (var _iterator = clientConfig.config.rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
         var rule = _step.value;

         lb.addRule(new zlb.Rule(rule));
      }
   } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
   } finally {
      try {
         if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
         }
      } finally {
         if (_didIteratorError) {
            throw _iteratorError;
         }
      }
   }

   var _iteratorNormalCompletion2 = true;
   var _didIteratorError2 = false;
   var _iteratorError2 = undefined;

   try {
      for (var _iterator2 = clientConfig.config.targetGroups[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
         var group = _step2.value;

         lb.addTargetGroup(new zlb.TargetGroup(group));
      }
   } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
   } finally {
      try {
         if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
         }
      } finally {
         if (_didIteratorError2) {
            throw _iteratorError2;
         }
      }
   }

   lb.on('error', console.log);

   log.green('Balancer initialized.');
};