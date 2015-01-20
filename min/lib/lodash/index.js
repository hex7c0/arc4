"use strict";

function lodash(algorithm, password) {
    var Class;
    switch (algorithm) {
      case "arc4":
        Class = require(min + "arc4.js");
        break;

      case "rc4a":
        Class = require(min + "rc4a.js");
        break;

      case "vmpc":
        Class = require(min + "vmpc.js");
        break;

      case "rc4+":
        Class = require(min + "rc4+.js");
        break;

      default:
        throw new TypeError("algorithm required");
    }
    if (!password) throw new TypeError("password required");
    return new Class(password);
}

var min = __dirname + "/";

module.exports = lodash;
