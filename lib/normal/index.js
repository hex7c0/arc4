'use strict';
/**
 * @file normal main
 * @module arc4
 * @subpackage normal
 * @version 3.2.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var min = __dirname + '/';

/*
 * functions
 */
/**
 * export class
 * 
 * @exports normal
 * @function normal
 * @param {String} algorithm - user key
 * @param {String|Array|Buffer} password - user key
 * @return {Object}
 */
function normal(algorithm, password) {

  var Class;
  try {
    Class = require(min + algorithm + '.js');
  } catch (e) {
    throw new TypeError('algorithm required');
  }
  if (!password) {
    throw new TypeError('password required');
  }
  return new Class(password);
}
module.exports = normal;
