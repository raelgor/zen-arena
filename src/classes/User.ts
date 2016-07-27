import * as bcrypt from 'bcrypt';

/**
 * @class User
 * @desc A user record wrapper class.
 * @param {object} user The user object. (Optional)
 * @returns {User}
 */
export default class User {

    record: any = {};

    constructor(user?) {

        /**
         * The user's record.
         * @memberof User
         * @type {object}
         */
        this.record = user || {};

    }

    /**
     * @method User.testPassword
     * @desc Tests a password against the current one.
     * @returns {Boolean}
     */
    testPassword(pwd) {
        return new Promise(
            resolve => bcrypt.compare(pwd, this.get('password'),
                (error, result) => resolve(result)));
    }

    /**
     * @method User.setPassword
     * @desc Hashes and sets the user's password.
     * @returns {Boolean}
     */
    async setPassword(pwd) {

        var salt = await new Promise<string>(resolve => bcrypt.genSalt(10, (err, res) => resolve(res)));
        var password = await new Promise(resolve => bcrypt.hash(pwd, salt, (err, res) => resolve(res)));

        this.set('password', password);

    }

    /**
     * @method User.updateRecord
     * @desc Updates the user's record using the `dataTransporter` object.
     * @returns {Promise}
     */
    updateRecord() {
        return data.updateUser(this);
    }

    /**
     * @method User.insertRecord
     * @desc Inserts the user's record using `upsert`.
     * @returns {Promise}
     */
    insertRecord() {
        return data.insertUser(this);
    }

    /**
     * @method User.get
     * @desc Returns the key from the record.
     * @param {string} key The key to fetch.
     * @returns {object}
     */
    get(key) {
        return this.record[key];
    }

    /**
     * @method User.set
     * @desc Sets `user.[key] = value`.
     * @param {string} key The key to set.
     * @param {any} value The value to assign.
     * @returns {any}
     */
    set(key, value) {
        this.record[key] = value;
        return value;
    }

    displayName() {

        // Make display name
        var displayName = '';

        if (this.get('username'))
            displayName = this.get('username');
        else {
            displayName = this.get('first_name') || '';
            displayName && (displayName += ' ');
            displayName += this.get('last_name') || '';
        }

        return displayName;

    }

    miniName() {
        return this.get('username') ||
            this.get('first_name') ||
            this.get('last_name') ||
            'ZenArena.com User';
    }

};
