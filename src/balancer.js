'use strict';

const zlb = require('zenx-lb');
const log = require('./log');

module.exports = clientConfig => {

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

   for(let rule of clientConfig.config.rules)
      lb.addRule(new zlb.Rule(rule));

   for(let group of clientConfig.config.targetGroups)
      lb.addTargetGroup(new zlb.TargetGroup(group));

   lb.on('error', console.log);

   log.green('Balancer initialized.');

};
