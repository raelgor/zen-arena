import make_core_text from './fn/make_core_text';

(async function get_data() {

    log('Getting cache data...');

    var configResponse = await dataTransporter.get({
        query: {},
        collection: 'configuration'
    });

    global["appConfig"] = {};

    for (let pair of configResponse)
        appConfig[pair.key] = pair.value;

    var textResponse = await dataTransporter.get({
        query: {},
        collection: 'text'
    });

    global["text"] = {};

    global["appLanguagesCodes"] = appConfig.app_languages.map(l => l.code);
    global["appLanguageCodeIndex"] = {};

    for (let lang of appConfig.app_languages)
        appLanguageCodeIndex[lang.code] = lang;

    global["languageCodes"] = new Set(appLanguagesCodes);

    for (let row of textResponse)
        text[row.origin] = text[row.origin] || {};

    for (let code of appLanguagesCodes)
        for (let origin in text)
            text[origin][code] = {};

    for (let row of textResponse)
        text[row.origin][row.language][row.id] = row;

    global["coreTextCache"] = {};

    for (let language in text.core)
        coreTextCache[language] = make_core_text(language);

    global["coreDbData"] = {};

    coreDbData.games = await dataTransporter
        .dbc
        .collection('games')
        .find({})
        .sort({ order: 1 })
        .toArray();

    log.green('Cache up to date.');

})();
