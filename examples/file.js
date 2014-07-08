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
var b = new Buffer('ciao I\'m hex7c0\nHow are you?\n:D'); // data
var cipher = rc4(a);

var d = cipher.codeBuffer(b); // encrypt

console.log('original: ' + b.toString());

// use {encoding: null} when you write buffer
fs.writeFile('crypted',d,{
    encoding: null
},function(err) {

    if (err) {
        console.log(err);
    } else {
        console.log('encrypt: ' + d);
    }
});

// use {encoding: null} when you read buffer
fs.readFile('crypted',{
    encoding: null
},function(err,data) {

    if (err) {
        console.log(err);
    } else {
        console.log(data)
        var e = cipher.codeBuffer(data); // decrypt
        console.log('decrypt: ' + e.toString());
    }
});
