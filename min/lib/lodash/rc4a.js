/*
 * arc4 v3.0.2
 * (c) hex7c0 http://supergiovane.tk/#/arc4
 * Licensed under GPLv3
 */
"use strict";function gKsa(a){for(var b=0,c=box.slice(),d=_.size(a),e=0;256>e;e++)b=(b+c[e]+a[e%d])%256,c[b]=[c[e],c[e]=c[b]][0];return c}function body(a,b){for(var c=0,d=0,e=0,f=b.slice(),g=b.slice(),h=[],i=0,j=_.size(a);j>i;i++)c=(c+1)%256,d=(d+f[c])%256,f[d]=[f[c],f[c]=f[d]][0],h.push(a[i]^g[(f[c]+f[d])%256]),++i<j&&(e=(e+g[c])%256,g[e]=[g[c],g[c]=g[e]][0],h.push(a[i]^f[(g[c]+g[d])%256]));return h}function RC4A(a){this.key,this.ksa,this.change(a)}try{var _=require("lodash")}catch(MODULE_NOT_FOUND){console.error(MODULE_NOT_FOUND),process.exit(1)}var box=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255];module.exports=function(a){return new RC4A(a)},RC4A.prototype.change=function(a){if(_.isArray(a))this.key=a;else{if(!_.isString(a)&&!Buffer.isBuffer(a))throw new Error("Invalid data");this.key=_.map(new Buffer(a),function(a){return a})}this.ksa=gKsa(this.key)},RC4A.prototype.codeString=function(a){for(var b=0,c=0,d=0,e=this.ksa.slice(),f=this.ksa.slice(),g="",h=0,i=_.size(a);i>h;h++)b=(b+1)%256,c=(c+e[b])%256,e[c]=[e[b],e[b]=e[c]][0],g+=String.fromCharCode(a.charCodeAt(h)^f[(e[b]+e[c])%256]),++h<i&&(d=(d+f[b])%256,f[d]=[f[b],f[b]=f[d]][0],g+=String.fromCharCode(a.charCodeAt(h)^e[(f[b]+f[d])%256]));return g},RC4A.prototype.encodeString=function(a,b,c){var d=new Buffer(a,b||"utf8");return new Buffer(body(d,this.ksa)).toString(c||"hex")},RC4A.prototype.decodeString=function(a,b,c){var d=new Buffer(a,b||"hex");return new Buffer(body(d,this.ksa)).toString(c||"utf8")},RC4A.prototype.codeArray=RC4A.prototype.encodeArray=RC4A.prototype.decodeArray=function(a){return body(a,this.ksa)},RC4A.prototype.codeBuffer=RC4A.prototype.encodeBuffer=RC4A.prototype.decodeBuffer=function(a){return new Buffer(body(a,this.ksa))},RC4A.prototype.encode=function(a,b,c){if(_.isString(a))return this.encodeString(a,b,c);if(_.isArray(a))return this.encodeArray(a);if(Buffer.isBuffer(a))return this.encodeBuffer(a);throw new Error("Invalid data")},RC4A.prototype.decode=function(a,b,c){if(_.isString(a))return this.decodeString(a,b,c);if(_.isArray(a))return this.decodeArray(a);if(Buffer.isBuffer(a))return this.decodeBuffer(a);throw new Error("Invalid data")},RC4A.prototype.code=function(a){if(_.isString(a))return this.codeString(a);if(_.isArray(a))return this.codeArray(a);if(Buffer.isBuffer(a))return this.codeBuffer(a);throw new Error("Invalid data")};
