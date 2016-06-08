"use strict";

var cluster = require('cluster');
function default_1(clientConfig, flags, config, numOfCores) {
    cluster.setupMaster({ exec: __dirname + '/slave.js' });
    var instances = clientConfig.instances || numOfCores;
    for (var i = 0; i < instances; i++) {
        forkOne();
    }function forkOne() {
        var worker = cluster.fork();
        worker.send({
            config: config,
            clientConfig: clientConfig,
            flags: flags
        });
        worker.on('disconnect', function () {
            worker.kill('SIGTERM');
            forkOne();
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;