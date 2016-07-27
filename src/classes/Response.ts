/**
 * @class Response
 * @desc A response object wrapper.
 * @prop {object} request Express request object.
 * @prop {object} response Express response object.
 * @prop {object} responseData The data to send on `.end()`.
 * @param {function} handler The main API call handler.
 * @returns {Response}
 */
export default class Response {

    request: any;
    response: any;
    responseData: string;
    pageData: any;

    constructor(request, response) {

        this.request = request;
        this.response = response;

        this.responseData = '';

        request._response = this;

    }

    /**
     * Calls response.end() with a stringify object.
     * @function end
     * @memberof Response
     * @returns undefined
     */
    end(object?: any) {
        return this.response.end(this.responseData);
    }

    /**
     * Port to `.redirect(...args)` method of express.
     * @function redirect
     * @memberof Response
     * @param {string} url The url to redirect to.
     * @returns undefined
     */
    redirect() {
        return this.response.redirect(...arguments);
    }

};
