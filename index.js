"use strict";
/**
 * @file arc4 main
 * @module arc4
 * @package arc4
 * @subpackage main
 * @version 2.2.3
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
 * @params {String} key - user key
 * @params {Boolean} [lodash] - flag
 * @return {RC4}
 */
module.exports = function arc4(key, lodash) {

    if (lodash) {
        return require(min + 'lodash.js')(key);
    }
    return require(min + 'normal.js')(key);
};
