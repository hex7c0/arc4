'use strict';
/**
 * @file array example
 * @module arc4
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var rc4 = require('..'); // use require('arc4') instead

var a = [ 112, 105, 112, 112, 111 ]; // key
var b = [ 99, 105, 97, 111 ]; // data
var cipher = rc4('arc4', a);

var d = cipher.encodeArray(b); // encrypt

var e = cipher.decodeArray(d); // decrypt

console.log('original: ' + b.toString());
console.log('encrypt: ' + d.toString());
console.log('decrypt: ' + e.toString());
