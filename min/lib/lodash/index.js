/*
 * arc4 v3.0.2
 * (c) hex7c0 http://supergiovane.tk/#/arc4
 * Licensed under GPLv3
 */
"use strict";var min=__dirname+"/";module.exports=function(a,b){var c;switch(a){case"arc4":c=require(min+"arc4.js");break;case"rc4a":c=require(min+"rc4a.js");break;case"vmpc":c=require(min+"vmpc.js");break;case"rc4+":c=require(min+"rc4+.js");break;default:throw new TypeError("algorithm required")}if(!b)throw new TypeError("password required");return c(b)};
