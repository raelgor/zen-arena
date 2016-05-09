/* global config */
'use strict';

const cluster = global.cluster;

module.exports = clientConfig => {

   cluster.setupMaster({ exec: __dirname + '/slave.js' });

   var instances = clientConfig.instances || global.numOfCores;

   for(let i = 0; i < instances; i++)
      forkOne();

   function forkOne(){
      let worker = cluster.fork();
      worker.send({config, clientConfig, DEBUG_MODE, TEST_MODE});

      worker.on('disconnect', () => {
         worker.kill('SIGTERM');
         forkOne();
      });
   }

};
