'use strict';
/**
 * @file file example
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
var fs = require('fs');

var a = 'hex7c0'; // key
var b = new Buffer('ciao I\'m hex7c0\nHow are you?\n:D'); // data
var cipher = rc4('arc4', a);

var d = cipher.encodeBuffer(b); // encrypt

console.log('original:\n' + b.toString());

// use {encoding: null} when you write buffer
fs.writeFile('crypted', d, {
  encoding: null
}, function(err) {

  if (err) {
    console.log(err);
  } else {
    console.log('\nencrypt:\n' + d + '\n');
  }
});

// use {encoding: null} when you read buffer
fs.readFile('crypted', {
  encoding: null
}, function(err, data) {

  if (err) {
    console.log(err);
  } else {
    var e = cipher.decodeBuffer(data); // decrypt
    console.log('decrypt:\n' + e.toString());
  }
});
