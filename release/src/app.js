/* global config */
'use strict';

var cluster = global.cluster;

module.exports = function (clientConfig) {

   cluster.setupMaster({ exec: __dirname + '/slave.js' });

   var instances = clientConfig.instances || global.numOfCores;

   for (var i = 0; i < instances; i++) {
      forkOne();
   }function forkOne() {
      var worker = cluster.fork();
      worker.send({ config: config, clientConfig: clientConfig, DEBUG_MODE: DEBUG_MODE, TEST_MODE: TEST_MODE });

      worker.on('disconnect', function () {
         worker.kill('SIGTERM');
         forkOne();
      });
   }
};