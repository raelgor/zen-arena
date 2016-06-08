import * as cluster from 'cluster';

export default function(clientConfig, flags: ClusterFlags, config, numOfCores) {

   cluster.setupMaster({ exec: __dirname + '/slave.js' });

   var instances = clientConfig.instances || numOfCores;

   for(let i = 0; i < instances; i++)
      forkOne();

   function forkOne(){
      let worker = cluster.fork();

      worker.send({
        config,
        clientConfig,
        flags
      });

      worker.on('disconnect', () => {
         worker.kill('SIGTERM');
         forkOne();
      });
   }

}
