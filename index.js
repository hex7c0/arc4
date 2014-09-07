"use strict";
/**
 * @file arc4 main
 * @module arc4
 * @package arc4
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
 * @params {String} algorithm - user key
 * @params {String} password - user key
 * @params {Boolean} [lodash] - flag
 * @return {Object}
 */
module.exports = function arc4(algorithm, password, lodash) {

    if (lodash) {
        return require(min + 'lodash/index.js')(algorithm, password);
    }
    return require(min + 'normal/index.js')(algorithm, password);
};
