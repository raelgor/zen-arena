import indent from '../fn/indent';
import Timer from '../classes/Timer';

export default async function getRecordByNamespace(req, namespace) {

  var i = indent(req, 1);
  log.debug(`${i}[dt][getRecordByNamespace] Getting ns record...`);
  var timer = new Timer();

  var response = await instance.mongos
      .collection('namespaces')
      .find({ $or: [{id: namespace}, {namespace}] })
      .toArray();

  var result = response[0];

  if(result && result.collection === 'users')
     result = await data.getUser({ id: result.id });

  log.debug(`${i}[dt][getRecordByNamespace] Done. (${timer.click()}ms)`);
  indent(req, -1);
  return result;

}
