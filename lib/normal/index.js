"use strict";
/**
 * @file normal main
 * @module arc4
 * @subpackage normal
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
 * @exports normal
 * @function normal
 * @params {String} algorithm - user key
 * @params {String} password - user key
 * @return {Object}
 */
module.exports = function normal(algorithm, password) {

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
    return Class(password);
};
