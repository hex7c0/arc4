'use strict';
/**
 * @file wrong example
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

var a = 'pippo'; // key
var b = 'ciao'; // data
var cipher = rc4('arc4', a);

var d = cipher.encodeString(b); // encrypt

cipher.change('pluto'); // change key

var e = cipher.decodeString(d); // decrypt

console.log('original: ' + b);
console.log('encrypt: ' + d);
console.log('decrypt: ' + e);
