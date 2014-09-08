"use strict";
/**
 * @file rc4a main
 * @module arc4
 * @package arc4
 * @subpackage lodash
 * @version 3.0.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var _ = require('lodash');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}
// load
var box = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
        37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
        55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
        73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
        91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106,
        107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
        121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134,
        135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148,
        149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162,
        163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176,
        177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190,
        191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204,
        205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218,
        219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232,
        233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246,
        247, 248, 249, 250, 251, 252, 253, 254, 255 ];

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
    var len = _.size(key);
    for (var i = 0; i < 256; i++) {
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
 * @return {Array|Buffer}
 */
function body(inp, gksa) {

    var i = 0, j1 = 0, j2 = 0;
    var s1 = gksa.slice();
    var s2 = gksa.slice();
    var out = [];
    for (var y = 0, l = _.size(inp); y < l; y++) {
        i = (i + 1) % 256;
        j1 = (j1 + s1[i]) % 256;
        s1[j1] = [ s1[i], s1[i] = s1[j1] ][0];
        out.push(inp[y] ^ s2[(s1[i] + s1[j1]) % 256]);
        if (++y < l) {
            j2 = (j2 + s2[i]) % 256;
            s2[j2] = [ s2[i], s2[i] = s2[j2] ][0];
            out.push(inp[y] ^ s1[(s2[i] + s2[j1]) % 256]);
        }
    }
    return out;
}

/**
 * export class
 * 
 * @exports lodash
 * @function lodash
 * @params {String} password - user password
 * @return {RC4A}
 */
module.exports = function lodash(password) {

    return new RC4A(password);
};

/*
 * class
 */
/**
 * RC4A class
 * 
 * @class RC4A
 * @param {String|Array|Buffer} key - user key
 * @return {Object}
 */
function RC4A(key) {

    this.key;
    this.ksa;
    this.change(key);
}

/**
 * change user key
 * 
 * @function change
 * @param {String|Array|Buffer} key - user key
 * @return {Array}
 */
RC4A.prototype.change = function(key) {

    if (_.isArray(key)) {
        this.key = key;
    } else if (_.isString(key) || Buffer.isBuffer(key)) {
        this.key = _.map(new Buffer(key), function(num) {

            return num;
        });
    } else {
        throw new Error('Invalid data');
    }
    this.ksa = gKsa(this.key);
    return;
};

/**
 * RC4A string code
 * 
 * @deprecated
 * @function codeString
 * @param {String} str - data
 * @return {String}
 */
RC4A.prototype.codeString = function(str) {

    console.info('arc4 > "codeString" method is deprecated');
    var i = 0, j1 = 0, j2 = 0;
    var s1 = this.ksa.slice();
    var s2 = this.ksa.slice();
    var out = '';
    for (var y = 0, l = _.size(str); y < l; y++) {
        i = (i + 1) % 256;
        j1 = (j1 + s1[i]) % 256;
        s1[j1] = [ s1[i], s1[i] = s1[j1] ][0];
        out += String.fromCharCode(str.charCodeAt(y)
                ^ s2[(s1[i] + s1[j1]) % 256]);
        if (++y < l) {
            j2 = (j2 + s2[i]) % 256;
            s2[j2] = [ s2[i], s2[i] = s2[j2] ][0];
            out += String.fromCharCode(str.charCodeAt(y)
                    ^ s1[(s2[i] + s2[j2]) % 256]);
        }
    }
    return out;
};

/**
 * RC4A string encode
 * 
 * @function encodeString
 * @param {String} str - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 * @return {String}
 */
RC4A.prototype.encodeString = function(str, input_encoding, output_encoding) {

    var out = new Buffer(str, input_encoding || 'utf8');
    return new Buffer(body(out, this.ksa)).toString(output_encoding || 'hex');
};

/**
 * RC4A string decode
 * 
 * @function decodeString
 * @param {String} str - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 * @return {String}
 */
RC4A.prototype.decodeString = function(str, input_encoding, output_encoding) {

    var out = new Buffer(str, input_encoding || 'hex');
    return new Buffer(body(out, this.ksa)).toString(output_encoding || 'utf8');
};

/**
 * RC4A array code
 * 
 * @function codeArray
 * @function encodeArray
 * @function decodeArray
 * @param {Array} arr - data
 * @return {Array}
 */
RC4A.prototype.codeArray = RC4A.prototype.encodeArray = RC4A.prototype.decodeArray = function(
                                                                                              arr) {

    return body(arr, this.ksa);
};

/**
 * RC4A buffer code
 * 
 * @function codeBuffer
 * @function encodeBuffer
 * @function decodeBuffer
 * @param {Buffer} buff - data
 * @return {Buffer}
 */
RC4A.prototype.codeBuffer = RC4A.prototype.encodeBuffer = RC4A.prototype.decodeBuffer = function(
                                                                                                 buff) {

    return new Buffer(body(buff, this.ksa));
};

/**
 * RC4A mixed encode
 * 
 * @function encode
 * @param {String|Array|Buffer} boh - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 * @return {String|Array|Buffer}
 */
RC4A.prototype.encode = function(boh, input_encoding, output_encoding) {

    if (_.isString(boh)) {
        return this.encodeString(boh, input_encoding, output_encoding);
    }
    if (_.isArray(boh)) {
        return this.encodeArray(boh);
    }
    if (Buffer.isBuffer(boh)) {
        return this.encodeBuffer(boh);
    }
    throw new Error('Invalid data');
    return;
};

/**
 * RC4A mixed decode
 * 
 * @function decode
 * @param {String|Array|Buffer} boh - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 * @return {String|Array|Buffer}
 */
RC4A.prototype.decode = function(boh, input_encoding, output_encoding) {

    if (_.isString(boh)) {
        return this.decodeString(boh, input_encoding, output_encoding);
    }
    if (_.isArray(boh)) {
        return this.decodeArray(boh);
    }
    if (Buffer.isBuffer(boh)) {
        return this.decodeBuffer(boh);
    }
    throw new Error('Invalid data');
    return;
};

/**
 * RC4A mixed code
 * 
 * @function code
 * @deprecated
 * @param {String|Array|Buffer} boh - data
 * @return {String|Array|Buffer}
 */
RC4A.prototype.code = function(boh) {

    if (_.isString(boh)) {
        return this.codeString(boh);
    }
    if (_.isArray(boh)) {
        return this.codeArray(boh);
    }
    if (Buffer.isBuffer(boh)) {
        return this.codeBuffer(boh);
    }
    throw new Error('Invalid data');
    return;
};
