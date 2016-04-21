'use strict';

const cluster = global.cluster;

module.exports = clientConfig => {

   cluster.setupMaster({ exec: __dirname + '/cluster.js' });

   var instances = clientConfig.instances || global.numOfCores;

   for(let i = 0; i < instances; i++) {
      let worker = cluster.fork();

      worker.send(clientConfig);

      worker.on('disconnect', () => {
         worker.kill('SIGTERM');
         cluster.fork().send(clientConfig);
      });
   }

};
