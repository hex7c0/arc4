"use strict";

var deprecate = require("util").deprecate, _ = require("lodash"), box = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255 ];

function gKsa(key) {
    for (var j = 0, s = box.slice(), len = _.size(key), i = 0; i < 256; ++i) s[j = (j + s[i] + key[i % len]) % 256] = [ s[i], s[i] = s[j] ][0];
    return s;
}

function body(inp, gksa) {
    var a, b, i = 0, j = 0, ksa = gksa.slice(), out = [];
    return _.map(inp, function(num, index) {
        a = ksa[i], j = ksa[(j + a) % 256], b = ksa[j], out[index] = num ^ ksa[ksa[b] + 1], 
        ksa[j] = [ a, ksa[i] = b ][0], i = (i + 1) % 256;
    }), out;
}

module.exports = function(password) {
    return new Vmpc(password);
};

function Vmpc(key) {
    this.key = null, this.ksa = null, this.change(key);
}

Vmpc.prototype.change = function(key) {
    if (_.isArray(key)) this.key = key; else {
        if (!_.isString(key) && !Buffer.isBuffer(key)) throw new Error("Invalid data");
        this.key = _.map(new Buffer(key), function(num) {
            return num;
        });
    }
    this.ksa = gKsa(this.key);
}, Vmpc.prototype.codeString = deprecate(function(str) {
    var a, b, i = 0, j = 0, out = "", ksa = this.ksa.slice();
    return _.map(str, function(num) {
        a = ksa[i], j = ksa[(j + a) % 256], b = ksa[j], out += String.fromCharCode(num.charCodeAt(0) ^ ksa[ksa[b] + 1]), 
        ksa[j] = [ a, ksa[i] = b ][0], i = (i + 1) % 256;
    }), out;
}, '"codeString" method is deprecated'), Vmpc.prototype.encodeString = function(str, input_encoding, output_encoding) {
    var out = new Buffer(str, input_encoding || "utf8");
    return new Buffer(body(out, this.ksa)).toString(output_encoding || "hex");
}, Vmpc.prototype.decodeString = function(str, input_encoding, output_encoding) {
    var out = new Buffer(str, input_encoding || "hex");
    return new Buffer(body(out, this.ksa)).toString(output_encoding || "utf8");
}, Vmpc.prototype.encodeArray = Vmpc.prototype.decodeArray = function(arr) {
    return body(arr, this.ksa);
}, Vmpc.prototype.encodeBuffer = Vmpc.prototype.decodeBuffer = function(buff) {
    return new Buffer(body(buff, this.ksa));
}, Vmpc.prototype.encode = function(boh, input_encoding, output_encoding) {
    if (_.isString(boh)) return this.encodeString(boh, input_encoding, output_encoding);
    if (_.isArray(boh)) return this.encodeArray(boh);
    if (Buffer.isBuffer(boh)) return this.encodeBuffer(boh);
    throw new Error("Invalid data");
}, Vmpc.prototype.decode = function(boh, input_encoding, output_encoding) {
    if (_.isString(boh)) return this.decodeString(boh, input_encoding, output_encoding);
    if (_.isArray(boh)) return this.decodeArray(boh);
    if (Buffer.isBuffer(boh)) return this.decodeBuffer(boh);
    throw new Error("Invalid data");
};
