'use strict';
/**
 * @file buffer example
 * @module arc4
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
var rc4 = require('..'); // use require('arc4') instead

var a = new Buffer('pippo'); // key
var b = new Buffer('ciao'); // data
var cipher = rc4('arc4', a);

var d = cipher.codeBuffer(b); // encrypt

var e = cipher.codeBuffer(d); // decrypt

console.log('original: ' + b.toString());
console.log('encrypt: ' + d.toString());
console.log('decrypt: ' + e.toString());
