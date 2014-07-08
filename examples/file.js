"use strict";
/**
 * @file file example
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
    var fs = require('fs');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

var a = 'hex7c0'; // key
var b = 'ciao I\'m hex7c0\nHow are you?\n:D'; // data
var cipher = rc4(a);

var d = cipher.codeString(b); // encrypt

console.log('original: ' + b.toString());

fs.writeFile('crypted',d,function(err) {

    if (err) {
        console.log(err);
    } else {
        console.log('encrypt: ' + d);
    }
});

fs.readFile('crypted',function(err,data) {

    if (err) {
        console.log(err);
    } else {
        var e = cipher.codeString(String(data)); // decrypt
        console.log('decrypt: ' + e.toString());
    }
});
