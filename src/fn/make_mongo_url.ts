/**
 * Creates a mongodb connection url from an options object.
 */
export default function make_mongo_url(options: {
    username?: string,
    password?: string,
    host: string,
    port: any,
    name: string,
    query?: string|Array<Object>
} = {
    host: 'localhost',
    port: '27017',
    name: ''
}): string {

    const auth_string =
        options.username ?
            `${options.username}:${options.password}@` : '';

    var mongoUrl =
        `mongodb://${auth_string + options.host}:${options.port}/${options.name}`;

    if (options.query)
        if (typeof options.query !== 'string') {
            if (Object.keys(options.query).length) {

                mongoUrl += '?';

                for (let key in <Array<Object>>options.query)
                    mongoUrl += `${key}=${options.query[key]}&`;

                mongoUrl = mongoUrl.substring(0, mongoUrl.length - 1);

            }
        } else {
            mongoUrl += (<string>options.query).replace(/(^[^?])/, '?$1');
        }

    return mongoUrl;

}
