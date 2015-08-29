'use strict';
/**
 * @file shortcuts example
 * @module arc4
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var normal = require('..').normal; // use require('arc4') instead
var lodash = require('..').lodash; // use require('arc4') instead

var a = 'pippo'; // key
var b = 'ciao'; // data
var cipher = normal('arc4', a);

var d = cipher.encodeString(b); // encrypt

var e = cipher.decodeString(d); // decrypt

console.log('normal');
console.log('    original: ' + b);
console.log('    encrypt: ' + d);
console.log('    decrypt: ' + e);

console.log();

var a = 'pippo'; // key
var b = 'ciao'; // data
var cipher = lodash('arc4', a);

var d = cipher.encodeString(b); // encrypt

var e = cipher.decodeString(d); // decrypt

console.log('lodash');
console.log('    original: ' + b);
console.log('    encrypt: ' + d);
console.log('    decrypt: ' + e);
