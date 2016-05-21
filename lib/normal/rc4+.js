'use strict';
/**
 * @file rc4+ normal
 * @module arc4
 * @subpackage normal
 * @version 3.0.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var deprecate = require('util').deprecate;
// load
var box = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
  38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
  57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
  76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94,
  95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
  111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125,
  126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140,
  141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155,
  156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
  171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185,
  186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200,
  201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215,
  216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230,
  231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245,
  246, 247, 248, 249, 250, 251, 252, 253, 254, 255 ];

/*
 * functions
 */
/**
 * generate ksa
 * 
 * @function gKsa
 * @param {Array} key - user key
 * @return {Array}
 */
function gKsa(key) {

  var j = 0;
  var s = box.slice();
  var len = key.length;
  for (var i = 0; i < 256; ++i) {
    j = (j + s[i] + key[i % len]) % 256;
    s[j] = [ s[i], s[i] = s[j] ][0];
  }
  return s;
}

/**
 * body cipher
 * 
 * @function body
 * @param {Array|Buffer} inp - input
 * @param {Array} gksa - ksa box
 * @param {Array|Buffer} container - out container
 * @param {Integer} length - limit
 * @return {Array|Buffer}
 */
function body(inp, gksa, container, length) {

  var i = 0, j = 0;
  var a, b, c;
  var out = container;
  var ksa = gksa.slice();
  for (var y = 0; y < length; ++y) {
    i = (i + 1) % 256;
    a = ksa[i];
    j = ksa[(j + a) % 256];
    b = ksa[j];
    ksa[j] = [ a, ksa[i] = b ][0];
    c = (ksa[i << 5 ^ j >> 3] + ksa[j << 5 ^ i >> 3]) % 256;
    out[y] = inp[y] ^ (ksa[a + b] + ksa[c ^ 0xAA]) ^ ksa[j + b];
  }
  return out;
}

/**
 * export class
 * 
 * @exports normal
 * @function normal
 * @param {String|Array|Buffer} password - user key
 * @return {Rc4p}
 */
module.exports = function(password) {

  return new Rc4p(password);
};

/*
 * class
 */
/**
 * Rc4p class
 * 
 * @class Rc4p
 * @param {String|Array|Buffer} key - user key
 */
function Rc4p(key) {

  this.key = null;
  this.ksa = null;
  this.change(key);
}

/**
 * change user key
 * 
 * @function change
 * @param {String|Array|Buffer} key - user key
 */
Rc4p.prototype.change = function(key) {

  this.key = new Array(key.length);
  if (Array.isArray(key)) {
    this.key = key;
  } else if (typeof (key) === 'string' || Buffer.isBuffer(key)) {
    var keys = new Buffer(key);
    for (var i = 0, ii = keys.length; i < ii; ++i) {
      this.key[i] = keys[i];
    }
  } else {
    throw new Error('Invalid data');
  }
  this.ksa = gKsa(this.key);
  return;
};

/**
 * Rc4p string code
 * 
 * @deprecated
 * @function codeString
 * @param {String} str - data
 * @return {String}
 */
Rc4p.prototype.codeString = deprecate(function(str) {

  var i = 0, j = 0;
  var a, b, c;
  var out = '';
  var ksa = this.ksa.slice();
  for (var y = 0, l = str.length; y < l; ++y) {
    i = (i + 1) % 256;
    a = ksa[i];
    j = ksa[(j + a) % 256];
    b = ksa[j];
    ksa[j] = [ a, ksa[i] = b ][0];
    c = (ksa[i << 5 ^ j >> 3] + ksa[j << 5 ^ i >> 3]) % 256;
    out += String.fromCharCode(str.charCodeAt(y) ^ (ksa[a + b] + ksa[c ^ 0xAA])
      ^ ksa[j + b]);
  }
  return out;
}, '"codeString" method is deprecated');

/**
 * Rc4p string encode
 * 
 * @function encodeString
 * @param {String} str - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 * @return {String}
 */
Rc4p.prototype.encodeString = function(str, input_encoding, output_encoding) {

  var out = new Buffer(str, input_encoding || 'utf8');
  var l = out.length;
  return new Buffer(body(out, this.ksa, new Buffer(l), l))
      .toString(output_encoding || 'hex');
};

/**
 * Rc4p string decode
 * 
 * @function decodeString
 * @param {String} str - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 * @return {String}
 */
Rc4p.prototype.decodeString = function(str, input_encoding, output_encoding) {

  var out = new Buffer(str, input_encoding || 'hex');
  var l = out.length;
  return new Buffer(body(out, this.ksa, new Buffer(l), l))
      .toString(output_encoding || 'utf8');
};

/**
 * Rc4p array code
 * 
 * @function codeArray
 * @function encodeArray
 * @function decodeArray
 * @param {Array} arr - data
 * @return {Array}
 */
Rc4p.prototype.encodeArray = Rc4p.prototype.decodeArray = function(arr) {

  var l = arr.length;
  return body(arr, this.ksa, new Array(l), l);
};

/**
 * Rc4p buffer code
 * 
 * @function codeBuffer
 * @function encodeBuffer
 * @function decodeBuffer
 * @param {Buffer} buff - data
 * @return {Buffer}
 */
Rc4p.prototype.encodeBuffer = Rc4p.prototype.decodeBuffer = function(buff) {

  var l = buff.length;
  return body(buff, this.ksa, new Buffer(l), l);
};

/**
 * Rc4p mixed encode
 * 
 * @function encode
 * @param {String|Array|Buffer} boh - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 */
Rc4p.prototype.encode = function(boh, input_encoding, output_encoding) {

  if (typeof (boh) === 'string') {
    return this.encodeString(boh, input_encoding, output_encoding);
  }
  if (Array.isArray(boh)) {
    return this.encodeArray(boh);
  }
  if (Buffer.isBuffer(boh)) {
    return this.encodeBuffer(boh);
  }
  throw new Error('Invalid data');
};

/**
 * Rc4p mixed decode
 * 
 * @function decode
 * @param {String|Array|Buffer} boh - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 */
Rc4p.prototype.decode = function(boh, input_encoding, output_encoding) {

  if (typeof (boh) === 'string') {
    return this.decodeString(boh, input_encoding, output_encoding);
  }
  if (Array.isArray(boh)) {
    return this.decodeArray(boh);
  }
  if (Buffer.isBuffer(boh)) {
    return this.decodeBuffer(boh);
  }
  throw new Error('Invalid data');
};
