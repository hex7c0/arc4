"use strict";

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

var min = __dirname + "/";

module.exports = lodash;
