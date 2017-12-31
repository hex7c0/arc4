"use strict";

var min = __dirname + "/";

function lodash(algorithm, password) {
    var Class;
    try {
        Class = require(min + algorithm + ".js");
    } catch (e) {
        throw new TypeError("algorithm required");
    }
    if (!password) throw new TypeError("password required");
    return new Class(password);
}

module.exports = lodash;
