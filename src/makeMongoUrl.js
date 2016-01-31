'use strict';

function makeMongoUrl(options) {
    
    const dbUser = options.dbUser;
    const dbPassword = options.dbPassword;
    const dbAuthStr = dbUser ? dbUser + ':' + dbPassword + '@' : '';
    const dbHost = options.dbHost;
    const dbName = options.dbName;
    
    var mongoUrl = 'mongodb://' + dbAuthStr + dbHost + '/' + dbName;
    
    if(Object.keys(options.query).length){
     
        mongoUrl += '?';
        
        for(let key in options.query)
            mongoUrl += key + '=' + options.query[key] + '&';
            
        mongoUrl = mongoUrl.substring(0, mongoUrl.length - 1);
    
    }
    
    return mongoUrl;
    
}

module.exports = makeMongoUrl;