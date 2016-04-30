/* global dataTransporter */
'use strict';

/**
 * @class User
 * @desc A user record wrapper class.
 * @param {object} user The user object. (Optional)
 * @returns {User}
 */
module.exports = class User {

   constructor(user){

      /**
       * The user's record.
       * @memberof User
       * @type {object}
       */
      this.record = user || {};

   }

   /**
    * @method User.updateRecord
    * @desc Updates the user's record using the `dataTransporter` object.
    * @returns {Promise}
    */
   updateRecord(){
      return dataTransporter.updateUser(this);
   }

   /**
    * @method User.insertRecord
    * @desc Inserts the user's record using `upsert`.
    * @returns {Promise}
    */
   insertRecord(){
      return dataTransporter.insertUser(this);
   }

   /**
    * @method User.get
    * @desc Returns the key from the record.
    * @param {string} key The key to fetch.
    * @returns {object}
    */
   get(key){
      return this.record[key];
   }

   /**
    * @method User.set
    * @desc Sets `user.[key] = value`.
    * @param {string} key The key to set.
    * @param {any} value The value to assign.
    * @returns {any}
    */
   set(key, value){
      this.record[key] = value;
      return value;
   }

   displayName() {

   	// Make display name
   	var displayName = '';

   	if(this.get('username'))
   	 	displayName = this.get('username');
    	else {
   		displayName = this.get('first_name') || '';
   		displayName && (displayName+=' ');
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
