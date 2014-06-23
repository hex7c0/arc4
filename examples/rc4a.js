"use strict";
/**
 * @file rc4a example
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
    var rc4 = require('../index.js'); // use require('arc4') instead
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

var a = 'pippo'; // key
var b = 'ciao'; // data
var cipher = rc4(a);

var d = cipher.codeStringRC4A(b); // encrypt

var e = cipher.codeStringRC4A(d); // decrypt

console.log('original: ' + b.toString());
console.log('encrypt: ' + d.toString());
console.log('decrypt: ' + e.toString());
