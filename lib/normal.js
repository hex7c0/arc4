"use strict";
/**
 * @file normal main
 * @module arc4
 * @package arc4
 * @subpackage lib
 * @version 2.2.3
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
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
 * export class
 * 
 * @exports normal
 * @function normal
 * @params {String} key - user key
 * @return {RC4}
 */
module.exports = function normal(key) {

    return new RC4(key);
};

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
    var ke = key;
    var len = ke.length;
    for (var i = 0; i < 256; i++) {
        j = (j + s[i] + ke[i % len]) % 256;
        s[j] = [ s[i], s[i] = s[j] ][0];
    }
    return s;
}

/**
 * body cipher
 * 
 * @function body
 * @param {String|Array|Buffer} inp - input
 * @param {String|Array|Buffer} res - response
 * @param {Array} ksa - ksa box
 * @return {String|Array|Buffer}
 */
function body(inp, res, ksa) {

    var i = 0, j = 0;
    var out = res;
    if (typeof (res) === 'string') {
        for (var y = 0, l = inp.length; y < l; y++) {
            i = (i + 1) % 256;
            j = (j + ksa[i]) % 256;
            ksa[j] = [ ksa[i], ksa[i] = ksa[j] ][0];
            out += String.fromCharCode(inp.charCodeAt(y)
                    ^ ksa[(ksa[i] + ksa[j]) % 256]);
        }
    } else {
        for (var y = 0, l = inp.length; y < l; y++) {
            i = (i + 1) % 256;
            j = (j + ksa[i]) % 256;
            ksa[j] = [ ksa[i], ksa[i] = ksa[j] ][0];
            out[y] = inp[y] ^ ksa[(ksa[i] + ksa[j]) % 256];
        }
    }
    return out;
}

/**
 * body cipher RC4A
 * 
 * @function bodyRC4A
 * @param {String|Array|Buffer} inp - input
 * @param {String|Array|Buffer} res - response
 * @param {Array} ksa - ksa box
 * @return {String|Array|Buffer}
 */
function bodyRC4A(inp, res, ksa) {

    var i = 0, j1 = 0, j2 = 0;
    var s2 = ksa.slice();
    var out = res;
    if (typeof (res) === 'string') {
        for (var y = 0, l = inp.length; y < l; y++) {
            i = (i + 1) % 256;
            j1 = (j1 + ksa[i]) % 256;
            ksa[j1] = [ ksa[i], ksa[i] = ksa[j1] ][0];
            out += String.fromCharCode(inp.charCodeAt(y)
                    ^ s2[(ksa[i] + ksa[j1]) % 256]);
            y++;
            j2 = (j2 + s2[i]) % 256;
            s2[j2] = [ s2[i], s2[i] = s2[j2] ][0];
            out += String.fromCharCode(inp.charCodeAt(y)
                    ^ ksa[(s2[i] + s2[j2]) % 256]);
        }
    } else {
        for (var y = 0, l = inp.length; y < l; y++) {
            i = (i + 1) % 256;
            j1 = (j1 + ksa[i]) % 256;
            ksa[j1] = [ ksa[i], ksa[i] = ksa[j1] ][0];
            out[y] = inp[y] ^ s2[(ksa[i] + ksa[j1]) % 256];
            y++;
            j2 = (j2 + s2[i]) % 256;
            s2[j2] = [ s2[i], s2[i] = s2[j2] ][0];
            out[y] = inp[y] ^ ksa[(s2[i] + s2[j1]) % 256];
        }
    }
    return out;
}

/**
 * body cipher VMPC
 * 
 * @function bodyVMPC
 * @param {String|Array|Buffer} inp - input
 * @param {String|Array|Buffer} res - response
 * @param {Array} ksa - ksa box
 * @return {String|Array|Buffer}
 */
function bodyVMPC(inp, res, ksa) {

    var i = 0, j = 0;
    var a, b;
    var out = res;
    if (typeof (res) === 'string') {
        for (var y = 0, l = inp.length; y < l; y++) {
            a = ksa[i];
            j = ksa[(j + a) % 256];
            b = ksa[j];
            out += String.fromCharCode(inp.charCodeAt(y) ^ ksa[ksa[b] + 1]);
            ksa[j] = [ a, ksa[i] = b ][0];
            i = (i + 1) % 256;
        }
    } else {
        for (var y = 0, l = inp.length; y < l; y++) {
            a = ksa[i];
            j = ksa[(j + a) % 256];
            b = ksa[j];
            out[y] = inp[y] ^ ksa[ksa[b] + 1];
            ksa[j] = [ a, ksa[i] = b ][0];
            i = (i + 1) % 256;
        }
    }
    return out;
}

/**
 * body cipher RC4P
 * 
 * @function bodyRC4P
 * @param {String|Array|Buffer} inp - input
 * @param {String|Array|Buffer} res - response
 * @param {Array} ksa - ksa box
 * @return {String|Array|Buffer}
 */
function bodyRC4P(inp, res, ksa) {

    var i = 0, j = 0;
    var a, b, c;
    var out = res;
    if (typeof (res) === 'string') {
        for (var y = 0, l = inp.length; y < l; y++) {
            i = (i + 1) % 256;
            a = ksa[i];
            j = ksa[(j + a) % 256];
            b = ksa[j];
            ksa[j] = [ a, ksa[i] = b ][0];
            c = (ksa[i << 5 ^ j >> 3] + ksa[j << 5 ^ i >> 3]) % 256;
            out += String.fromCharCode(inp.charCodeAt(y)
                    ^ (ksa[a + b] + ksa[c ^ 0xAA]) ^ ksa[j + b]);
        }
    } else {
        for (var y = 0, l = inp.length; y < l; y++) {
            i = (i + 1) % 256;
            a = ksa[i];
            j = ksa[(j + a) % 256];
            b = ksa[j];
            ksa[j] = [ a, ksa[i] = b ][0];
            c = (ksa[i << 5 ^ j >> 3] + ksa[j << 5 ^ i >> 3]) % 256;
            out[y] = inp[y] ^ (ksa[a + b] + ksa[c ^ 0xAA]) ^ ksa[j + b];
        }
    }
    return out;
}

/*
 * class
 */
/**
 * RC4 class
 * 
 * @class RC4
 * @param {String|Array|Buffer} key - user key
 * @return {Object}
 */
function RC4(key) {

    this.key;
    this.change(key);
}
/**
 * change user key
 * 
 * @function change
 * @param {String|Array|Buffer} key - user key
 */
RC4.prototype.change = function(key) {

    this.key = new Array(key.legth);
    if (Array.isArray(key)) {
        this.key = key;
    } else if (typeof (key) === 'string' || Buffer.isBuffer(key)) {
        var key = new Buffer(key);
        for (var i = 0, ii = key.length; i < ii; i++) {
            this.key[i] = key[i];
        }
    } else {
        throw new Error('Invalid data');
    }
    return;
};
/**
 * RC4 string code
 * 
 * @function codeString
 * @param {String} str - data
 * @return {String}
 */
RC4.prototype.codeString = function(str) {

    return body(str, '', gKsa(this.key));
};
/**
 * RC4 array code
 * 
 * @function codeArray
 * @param {Array} arr - data
 * @return {Array}
 */
RC4.prototype.codeArray = function(arr) {

    return body(arr, new Array(arr.length), gKsa(this.key));
};
/**
 * RC4 buffer code
 * 
 * @function codeBuffer
 * @param {Buffer} buff - data
 * @return {Buffer}
 */
RC4.prototype.codeBuffer = function(buff) {

    return body(buff, new Buffer(buff.length), gKsa(this.key));
};
/**
 * RC4 mixed code. Alias for codeString or codeByte
 * 
 * @function code
 * @param {String|Array|Buffer} boh - data
 * @return {String|Array|Buffer}
 */
RC4.prototype.code = function(boh) {

    if (typeof (boh) === 'string') {
        return this.codeString(boh);
    }
    if (Array.isArray(boh)) {
        return this.codeArray(boh);
    }
    if (Buffer.isBuffer(boh)) {
        return this.codeBuffer(boh);
    }
    throw new Error('Invalid data');
    return;
};
/**
 * RC4A string code
 * 
 * @function codeStringRC4A
 * @param {String} str - data
 * @return {String}
 */
RC4.prototype.codeStringRC4A = function(str) {

    return bodyRC4A(str, '', gKsa(this.key));
};
/**
 * RC4A array code
 * 
 * @function codeArrayRC4A
 * @param {Array} arr - data
 * @return {Array}
 */
RC4.prototype.codeArrayRC4A = function(arr) {

    return bodyRC4A(arr, new Array(arr.length), gKsa(this.key));
};
/**
 * RC4A buffer code
 * 
 * @function codeBufferRC4A
 * @param {Buffer} buff - data
 * @return {Buffer}
 */
RC4.prototype.codeBufferRC4A = function(buff) {

    return bodyRC4A(buff, new Buffer(buff.length), gKsa(this.key));
};
/**
 * RC4A mixed code. Alias for codeString or codeByte
 * 
 * @function codeRC4A
 * @param {String|Array|Buffer} boh - data
 * @return {String|Array|Buffer}
 */
RC4.prototype.codeRC4A = function(boh) {

    if (typeof (boh) === 'string') {
        return this.codeStringRC4A(boh);
    }
    if (Array.isArray(boh)) {
        return this.codeArrayRC4A(boh);
    }
    if (Buffer.isBuffer(boh)) {
        return this.codeBufferRC4A(boh);
    }
    throw new Error('Invalid data');
    return;
};
/**
 * VMPC string code
 * 
 * @function codeStringVMPC
 * @param {String} str - data
 * @return {String}
 */
RC4.prototype.codeStringVMPC = function(str) {

    return bodyVMPC(str, '', gKsa(this.key));
};
/**
 * VMPC array code
 * 
 * @function codeArrayVMPC
 * @param {Array} arr - data
 * @return {Array}
 */
RC4.prototype.codeArrayVMPC = function(arr) {

    return bodyVMPC(arr, new Array(arr.length), gKsa(this.key));
};
/**
 * VMPC buffer code
 * 
 * @function codeBufferVMPC
 * @param {Buffer} buff - data
 * @return {Buffer}
 */
RC4.prototype.codeBufferVMPC = function(buff) {

    return bodyVMPC(buff, new Buffer(buff.length), gKsa(this.key));
};
/**
 * VMPC mixed code. Alias for codeString or codeByte
 * 
 * @function codeVMPC
 * @param {String|Array} boh - data
 * @return {String|Array}
 */
RC4.prototype.codeVMPC = function(boh) {

    if (typeof (boh) === 'string') {
        return this.codeStringVMPC(boh);
    }
    if (Array.isArray(boh)) {
        return this.codeArrayVMPC(boh);
    }
    if (Buffer.isBuffer(boh)) {
        return this.codeBufferVMPC(boh);
    }
    throw new Error('Invalid data');
    return;
};
/**
 * RC4P string code
 * 
 * @function codeStringRC4P
 * @param {String} str - data
 * @return {String}
 */
RC4.prototype.codeStringRC4P = function(str) {

    return bodyRC4P(str, '', gKsa(this.key));
};
/**
 * RC4P array code
 * 
 * @function codeArrayRC4P
 * @param {Array} arr - data
 * @return {Array}
 */
RC4.prototype.codeArrayRC4P = function(arr) {

    return bodyRC4P(arr, new Array(arr.length), gKsa(this.key));
};
/**
 * RC4P buffer code
 * 
 * @function codeBufferRC4P
 * @param {Buffer} buff - data
 * @return {Buffer}
 */
RC4.prototype.codeBufferRC4P = function(buff) {

    return bodyRC4P(buff, new Buffer(buff.length), gKsa(this.key));
};
/**
 * RC4P mixed code. Alias for codeString or codeByte
 * 
 * @function codeRC4P
 * @param {String|Array|Array} boh - data
 * @return {String|Array|Array}
 */
RC4.prototype.codeRC4P = function(boh) {

    if (typeof (boh) === 'string') {
        return this.codeStringRC4P(boh);
    }
    if (Array.isArray(boh)) {
        return this.codeArrayRC4P(boh);
    }
    if (Buffer.isBuffer(boh)) {
        return this.codeBufferRC4P(boh);
    }
    throw new Error('Invalid data');
    return;
};
