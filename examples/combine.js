'use strict';
/**
 * @file combine example
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
var b = '1'; // data
var cipher = rc4('arc4', a);

var d = cipher.codeString(b); // encrypt
d = [ d.charCodeAt(0) ]; // string->byte

var e = cipher.decode(d); // decrypt
e = String.fromCharCode(e[0]); // byte -> string

console.log('original: ' + b.toString());
console.log('encrypt: ' + d.toString());
console.log('decrypt: ' + e.toString());
