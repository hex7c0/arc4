'use strict';
/**
 * @file arc4 main
 * @module arc4
 * @subpackage main
 * @version 3.3.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var min = __dirname + '/min/lib/';
var minNormal = min + 'normal/index.js';
var minLodash = min + 'lodash/index.js';

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

  if (!lodash) {
    return require(minNormal)(algorithm, password);
  }
  return require(minLodash)(algorithm, password);
}
module.exports = arc4;

/**
 * export normal function
 * 
 * @exports normal
 * @function normal
 * @param {String} algorithm - user key
 * @param {String|Array|Buffer} password - user key
 * @return {Object}
 */
function normal(algorithm, password) {

  return require(minNormal)(algorithm, password);
}
module.exports.normal = normal;

/**
 * export normal function
 * 
 * @exports normal
 * @function normal
 * @param {String} algorithm - user key
 * @param {String|Array|Buffer} password - user key
 * @return {Object}
 */
function lodash(algorithm, password) {

  return require(minLodash)(algorithm, password);
}
module.exports.lodash = lodash;
