'use strict';

function make_mongo_url(options) {
    
    const auth_string = options.user ? options.user + ':' + options.password + '@' : '';
    
    var mongoUrl = `mongodb://${auth_string+(options.host||'localhost')}:${options.port||27017}/${options.name}`;
    
    if(options.query_string)
        if(typeof options.query_string !== 'string') {
            if(Object.keys(options.query_string).length){
        
                mongoUrl += '?';
                
                for(let key in options.query)
                    mongoUrl += key + '=' + options.query[key] + '&';
                    
                mongoUrl = mongoUrl.substring(0, mongoUrl.length - 1);
        
            }
        } else {
            mongoUrl += options.query_string.replace(/(^[^?])/, '?$1');
        }
        
    return mongoUrl;
    
}

module.exports = make_mongo_url;