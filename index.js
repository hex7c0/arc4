"use strict";
/**
 * @file arc4 main
 * @module arc4
 * @package arc4
 * @subpackage main
 * @version 1.0.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * functions
 */
/**
 * build sbox
 * 
 * @function sbox
 * @return {Array}
 */
function sbox() {

    return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,
            25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,
            47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,
            69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,
            91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,
            110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,
            126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,
            142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,
            158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,
            174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,
            190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,
            206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,
            222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,
            238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,
            254,255];
}
/**
 * convert string to byte
 * 
 * @function bytearray
 * @param {String} str - user key
 * @return {Array}
 */
function bytearray(str) {

    var l = str.length;
    var bytes = new Array(l);
    for (var i = 0; i < l; i++) {
        bytes[i] = (str.charCodeAt(i));
    }
    return bytes;
}
/**
 * export class
 * 
 * @exports rc4
 */
module.exports = function(key) {

    return new rc4(key);
};

/*
 * class
 */
/**
 * rc4 class
 * 
 * @class rc4
 * @param {String!Array} key - user key
 * @return {Object}
 */
function rc4(key) {

    this.key = '';
    this.change(key);
    this.len = this.key.length;
    return;
}
/**
 * change user key
 * 
 * @function change
 * @param {String!Array} key - user key
 * @return
 */
rc4.prototype.change = function(key) {

    if (typeof (key) == 'string') {
        this.key = bytearray(key);
    } else if (Array.isArray(key)) {
        this.key = key;
    } else {
        throw new Error('Invalid key');
    }
    return;
};
/**
 * string code
 * 
 * @function codeString
 * @param {String} str - data
 * @return {String}
 */
rc4.prototype.codeString = function(str) {

    var res = '';
    var j = 0;
    var s = sbox();
    var key = this.key;
    var len = this.len;
    for (var i = 0; i < 256; i++) {
        j = (j + s[i] + key[i % len]) % 256;
        s[j] = [s[i],s[i] = s[j]][0];
    }
    i = j = 0;
    for (var y = 0, l = str.length; y < l; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        s[j] = [s[i],s[i] = s[j]][0];
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
};
/**
 * byte code
 * 
 * @function codeByte
 * @param {Array} byt - data
 * @return {Array}
 */
rc4.prototype.codeByte = function(byt) {

    var res = [];
    var j = 0;
    var s = sbox();
    var key = this.key;
    var len = this.len;
    for (var i = 0; i < 256; i++) {
        j = (j + s[i] + key[i % len]) % 256;
        s[j] = [s[i],s[i] = s[j]][0];
    }
    i = j = 0;
    for (var y = 0, l = byt.length; y < l; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        s[j] = [s[i],s[i] = s[j]][0];
        res[y] = (byt[y] ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
};
/**
 * mixed code. Alias for codeString or codeByte
 * 
 * @function code
 * @param {String|Array} boh - data
 * @return {String|Array}
 */
rc4.prototype.code = function(boh) {

    if (typeof (boh) == 'string') {
        return this.codeString(boh);
    } else if (Array.isArray(boh)) {
        return this.codeByte(boh);
    } else {
        throw new Error('Invalid data');
    }
    return;
};
