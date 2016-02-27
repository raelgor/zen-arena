'use strict';

/**
 * Used to measure time for tests.
 * @class Timer
 * @prop {number} _last The last `Date.now()` that was made.
 * @returns {Timer}
 */
module.exports = class Timer {

   constructor() {
      this._last = Date.now();
   }

   /**
    * Returns the time difference from the last click or object creation.
    * @method Timer.click
    * @returns {number}
    */
   click() {
         var d = Date.now() - this._last;
         this._last = Date.now();
         return d;
   }

};
