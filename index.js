'use strict';
/**
 * @file arc4 main
 * @module arc4
 * @subpackage main
 * @version 3.0.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
// load
var min = __dirname + '/min/lib/';

/*
 * functions
 */
/**
 * export
 * 
 * @exports arc4
 * @function arc4
 * @param {String} algorithm - user key
 * @param {String|Array|Buffer} password - user key
 * @param {Boolean} [lodash] - flag
 * @return {Object}
 */
function arc4(algorithm, password, lodash) {

  if (lodash) {
    return require(min + 'lodash/index.js')(algorithm, password);
  }
  return require(min + 'normal/index.js')(algorithm, password);
}
module.exports = arc4;
