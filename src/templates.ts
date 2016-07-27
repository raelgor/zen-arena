import * as jade from 'jade';

global["templates"] = {};

loaddirSync(
    './templates',
    'templates',
    '.jade',
    filePath => jade.compileFile(`./src/${filePath}`)
);
