import Response from './Response';

/**
 * @class JSONResponse
 * @extends Response
 * @desc A class for API routes with a custom {@link JSONResponse} object.
 * @param {function} handler The main API call handler.
 * @returns {JSONResponse}
 */
export default class JSONResponse extends Response {

    rid: string;
    responseData: any;

    constructor(request, response) {

        super(request, response);

        this.responseData = {};

    }

    /**
     * Calls response.end() with a JSON stringified responseData object and sets
     * headers for a JSON response.
     * @function end
     * @memberof JSONResponse
     * @param {object} object The object to stringify and return. (Optional)
     * @returns undefined
     */
    end(object?: any) {
        this.response.setHeader('content-type', 'application/json');
        if (!isNaN(this.request.body.rid))
            this.rid = this.request.body.rid;
        return this.response.end(JSON.stringify({
            rid: this.rid,
            error: object && object.error,
            data: object && !object.error ? object : this.responseData
        }));
    }

    /**
     * Returns the final route middleware to pass to an
     * @function error
     * @memberof JSONResponse
     * @param {string} message The error message or code.
     * @returns undefined
     */
    error(message) {
        return this.end({ error: message });
    }

};
