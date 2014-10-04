'use strict';
/**
 * @file combine example
 * @module arc4
 * @package arc4
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var rc4 = require('../index.min.js'); // use require('arc4') instead
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

var a = 'pippo'; // key
var b = '1'; // data
var cipher = rc4('arc4', a);

var d = cipher.code(b); // encrypt
d = [ d.charCodeAt(0) ]; // string->byte

var e = cipher.code(d); // decrypt
e = String.fromCharCode(e[0]); // byte -> string

console.log('original: ' + b.toString());
console.log('encrypt: ' + d.toString());
console.log('decrypt: ' + e.toString());
