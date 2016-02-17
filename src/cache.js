/* global appConfig, config, cacheClient, log, co */
'use strict';

module.exports = get_data();

function get_data(){

    log('Updating cache data...');

    return co(function*(){

      var updated;

      global._cache_is_updating = true;
      global._on_cache_updated = new Promise(r => updated = r);

        var configResponse = yield cacheClient.get({
            query: {},
            database: config.cache_server.db_name,
            collection: 'configuration'
        });

        global.appConfig = {};

        for(let pair of configResponse)
            appConfig[pair.key] = pair.value;

        var textResponse = yield cacheClient.get({
            query: {},
            database: config.cache_server.db_name,
            collection: 'text'
        });

        global.text = {};

        // global.text.origin.lang.id
        for(let row of textResponse)
            global.text[row.origin] = global.text[row.origin] || {};

        for(let code of global.appConfig.app_languages)
            for(let origin in global.text)
                global.text[origin][code] = {};

        for(let row of textResponse)
            global.text[row.origin][row.language][row.id] = row;

        log.green('Cache up to date.');

        global._cache_is_updating = false;
        updated();

        setTimeout(get_data, 6e4);

    });

}
