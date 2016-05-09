'use strict';

module.exports = (req, namespace) => co(function*(){

  var i = indent(req, 1);
  log.debug(`${i}[dt][getRecordByNamespace] Getting ns record...`);
  var timer = new Timer();

  var response = yield mongos
      .collection('namespaces')
      .find({ $or: [{id: namespace}, {namespace}] })
      .toArray();

  var result = response[0];

  if(result && result.collection === 'users')
     result = yield data.getUser({ id: result.id });

  log.debug(`${i}[dt][getRecordByNamespace] Done. (${timer.click()}ms)`);
  indent(req, -1);
  return result;

}).catch(e => instance.emit('error', e));
