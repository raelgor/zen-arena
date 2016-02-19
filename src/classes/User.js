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
       * @access public
       * @type {object}
       */
      this.record = user || {};

   }

   /**
    * @method User.updateRecord
    * @access public
    * @desc Updates the user's record using the `dataTransporter` object.
    * @returns {Promise}
    */
   updateRecord(){
      return dataTransporter.updateUser(this);
   }

   /**
    * @method User.insertRecord
    * @access public
    * @desc Inserts the user's record using `upsert`.
    * @returns {Promise}
    */
   insertRecord(){
      return dataTransporter.insertUser(this);
   }

   /**
    * @method User.getSession
    * @desc Returns the session record or null.
    * @param {string} token The session token.
    * @returns {object}
    */
   getSession(token){
      if(this.record.sessions && this.record.sessions[token])
         return this.record.sessions[token];
      else
         return null;
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

};
