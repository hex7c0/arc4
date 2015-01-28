'use strict';
/**
 * @file lodash main
 * @module arc4
 * @subpackage lodash
 * @version 3.0.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
// load
var min = __dirname + '/';

/*
 * functions
 */
/**
 * export class
 * 
 * @exports lodash
 * @function lodash
 * @param {String} algorithm - user key
 * @param {String} password - user key
 * @return {Object}
 */
function lodash(algorithm, password) {

  var Class;
  switch (algorithm) {
    case 'arc4':
      Class = require(min + 'arc4.js');
      break;
    case 'rc4a':
      Class = require(min + 'rc4a.js');
      break;
    case 'vmpc':
      Class = require(min + 'vmpc.js');
      break;
    case 'rc4+':
      Class = require(min + 'rc4+.js');
      break;
    default:
      throw new TypeError('algorithm required');
  }
  if (!password) {
    throw new TypeError('password required');
  }
  return new Class(password);
}
module.exports = lodash;
