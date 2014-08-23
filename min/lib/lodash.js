/*
 * arc4 v2.2.3
 * (c) hex7c0 http://supergiovane.tk/#/arc4
 * Licensed under GPLv3
 */
"use strict";function gKsa(a){for(var b=0,c=box.slice(),d=_.size(a),e=0;256>e;e++)b=(b+c[e]+a[e%d])%256,c[b]=[c[e],c[e]=c[b]][0];return c}function body(a,b,c){var d=0,e=0;if(b===!1){var f="";return _.map(a,function(a){d=(d+1)%256,e=(e+c[d])%256,c[e]=[c[d],c[d]=c[e]][0],f+=String.fromCharCode(a.charCodeAt(0)^c[(c[d]+c[e])%256])}),f}return _.map(a,function(a){return d=(d+1)%256,e=(e+c[d])%256,c[e]=[c[d],c[d]=c[e]][0],a^c[(c[d]+c[e])%256]})}function bodyRC4A(a,b,c){var d=0,e=0,f=0,g=c.slice();if(b===!1){for(var h="",i=0,j=_.size(a);j>i;i++)d=(d+1)%256,e=(e+c[d])%256,c[e]=[c[d],c[d]=c[e]][0],h+=String.fromCharCode(a.charCodeAt(i)^g[(c[d]+c[e])%256]),i++,f=(f+g[d])%256,g[f]=[g[d],g[d]=g[f]][0],h+=String.fromCharCode(a.charCodeAt(i)^c[(g[d]+g[f])%256]);return h}for(var h=b,i=0,j=_.size(a);j>i;i++)d=(d+1)%256,e=(e+c[d])%256,c[e]=[c[d],c[d]=c[e]][0],h[i]=a[i]^g[(c[d]+c[e])%256],i++,f=(f+g[d])%256,g[f]=[g[d],g[d]=g[f]][0],h[i]=a[i]^c[(g[d]+g[e])%256];return h}function bodyVMPC(a,b,c){var d,e,f=0,g=0;if(b===!1){var h="";return _.map(a,function(a){d=c[f],g=c[(g+d)%256],e=c[g],h+=String.fromCharCode(a.charCodeAt(0)^c[c[e]+1]),c[g]=[d,c[f]=e][0],f=(f+1)%256}),h}var h=b;return _.map(a,function(a,b){d=c[f],g=c[(g+d)%256],e=c[g],h[b]=a^c[c[e]+1],c[g]=[d,c[f]=e][0],f=(f+1)%256}),h}function bodyRC4P(a,b,c){var d,e,f,g=0,h=0;if(b===!1){var i="";return _.map(a,function(a){g=(g+1)%256,d=c[g],h=c[(h+d)%256],e=c[h],c[h]=[d,c[g]=e][0],f=(c[g<<5^h>>3]+c[h<<5^g>>3])%256,i+=String.fromCharCode(a.charCodeAt(0)^c[d+e]+c[170^f]^c[h+e])}),i}return _.map(a,function(a){return g=(g+1)%256,d=c[g],h=c[(h+d)%256],e=c[h],c[h]=[d,c[g]=e][0],a^c[d+e]+c[170^f]^c[h+e]})}function RC4(a){this.key=this.change(a)}try{var _=require("lodash")}catch(MODULE_NOT_FOUND){console.error(MODULE_NOT_FOUND),process.exit(1)}var box=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255];module.exports=function(a){return new RC4(a)},RC4.prototype.change=function(a){if(_.isString(a)||Buffer.isBuffer(a))return _.map(new Buffer(a),function(a){return a});if(_.isArray(a))return a;throw new Error("Invalid data")},RC4.prototype.codeString=function(a){return body(a,!1,gKsa(this.key))},RC4.prototype.codeArray=function(a){return body(a,null,gKsa(this.key))},RC4.prototype.codeBuffer=function(a){return new Buffer(body(a,null,gKsa(this.key)))},RC4.prototype.code=function(a){if(_.isString(a))return this.codeString(a);if(_.isArray(a))return this.codeArray(a);if(Buffer.isBuffer(a))return this.codeBuffer(a);throw new Error("Invalid data")},RC4.prototype.codeStringRC4A=function(a){return bodyRC4A(a,!1,gKsa(this.key))},RC4.prototype.codeArrayRC4A=function(a){return bodyRC4A(a,new Array(_.size(a)),gKsa(this.key))},RC4.prototype.codeBufferRC4A=function(a){return new Buffer(bodyRC4A(a,new Buffer(_.size(a)),gKsa(this.key)))},RC4.prototype.codeRC4A=function(a){if(_.isString(a))return this.codeStringRC4A(a);if(_.isArray(a))return this.codeArrayRC4A(a);if(Buffer.isBuffer(a))return this.codeBufferRC4A(a);throw new Error("Invalid data")},RC4.prototype.codeStringVMPC=function(a){return bodyVMPC(a,!1,gKsa(this.key))},RC4.prototype.codeArrayVMPC=function(a){return bodyVMPC(a,new Array(_.size(a)),gKsa(this.key))},RC4.prototype.codeBufferVMPC=function(a){return new Buffer(bodyVMPC(a,new Buffer(_.size(a)),gKsa(this.key)))},RC4.prototype.codeVMPC=function(a){if(_.isString(a))return this.codeStringVMPC(a);if(_.isArray(a))return this.codeArrayVMPC(a);if(Buffer.isBuffer(a))return this.codeBufferVMPC(a);throw new Error("Invalid data")},RC4.prototype.codeStringRC4P=function(a){return bodyRC4P(a,!1,gKsa(this.key))},RC4.prototype.codeArrayRC4P=function(a){return bodyRC4P(a,null,gKsa(this.key))},RC4.prototype.codeBufferRC4P=function(a){return new Buffer(bodyRC4P(a,null,gKsa(this.key)))},RC4.prototype.codeRC4P=function(a){if(_.isString(a))return this.codeStringRC4P(a);if(_.isArray(a))return this.codeArrayRC4P(a);if(Buffer.isBuffer(a))return this.codeBufferRC4P(a);throw new Error("Invalid data")};
