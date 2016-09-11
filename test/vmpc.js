'use strict';
/**
 * @file vmpc test
 * @module vmpc
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var rc4 = require('..');
var assert = require('assert');

/*
 * test module
 */
describe('vmpc', function() {

  var a; // key
  var b; // data

  describe('string', function() {

    it('should return same string', function(done) {

      a = 'pippo';
      b = 'ciao';
      var cipher = rc4('vmpc', a);
      var d = cipher.encodeString(b); // encrypt
      var e = cipher.decodeString(d); // decrypt
      assert.deepEqual(b, e, 'clear');
      assert.notDeepEqual(b, d, 'orig - encrypt');
      assert.notDeepEqual(e, d, 'encrypt - decrypt');

      var cipher = rc4('vmpc', a, true);
      var dd = cipher.encodeString(b); // encrypt
      var ee = cipher.decodeString(dd); // decrypt
      assert.deepEqual(b, ee, 'lodash');
      assert.notDeepEqual(b, dd, 'orig - encrypt');
      assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

      assert.deepEqual(d, dd, 'encrypt');
      assert.deepEqual(e, ee, 'decrypt');
      done();
    });
    it('should return same string. encoding', function(done) {

      a = 'pippo';
      b = 'ciao';
      var cipher = rc4('vmpc', a);
      var d = cipher.encodeString(b, 'utf16le', 'hex'); // encrypt
      var e = cipher.decodeString(d, 'hex', 'utf16le'); // decrypt
      assert.deepEqual(b, e, 'clear');
      assert.notDeepEqual(b, d, 'orig - encrypt');
      assert.notDeepEqual(e, d, 'encrypt - decrypt');

      var cipher = rc4('vmpc', a, true);
      var dd = cipher.encodeString(b, 'utf16le', 'hex'); // encrypt
      var ee = cipher.decodeString(dd, 'hex', 'utf16le'); // decrypt
      assert.deepEqual(b, ee, 'lodash');
      assert.notDeepEqual(b, dd, 'orig - encrypt');
      assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

      assert.deepEqual(d, dd, 'encrypt');
      assert.deepEqual(e, ee, 'decrypt');
      done();
    });
    it('should return same string. auto', function(done) {

      a = 'pippo';
      b = 'ciao';
      var cipher = rc4('vmpc', a);
      var d = cipher.encode(b); // encrypt
      var e = cipher.decode(d); // decrypt
      assert.deepEqual(b, e, 'clear');
      assert.notDeepEqual(b, d, 'orig - encrypt');
      assert.notDeepEqual(e, d, 'encrypt - decrypt');

      var cipher = rc4('vmpc', a, true);
      var dd = cipher.encode(b); // encrypt
      var ee = cipher.decode(dd); // decrypt
      assert.deepEqual(b, ee, 'lodash');
      assert.notDeepEqual(b, dd, 'orig - encrypt');
      assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

      assert.deepEqual(d, dd, 'encrypt');
      assert.deepEqual(e, ee, 'decrypt');
      done();
    });
    it('should return same string. auto encoding', function(done) {

      a = 'pippo';
      b = 'ciao';
      var cipher = rc4('vmpc', a);
      var d = cipher.encode(b, 'utf16le', 'hex'); // encrypt
      var e = cipher.decode(d, 'hex', 'utf16le'); // decrypt
      assert.deepEqual(b, e, 'clear');
      assert.notDeepEqual(b, d, 'orig - encrypt');
      assert.notDeepEqual(e, d, 'encrypt - decrypt');

      var cipher = rc4('vmpc', a, true);
      var dd = cipher.encode(b, 'utf16le', 'hex'); // encrypt
      var ee = cipher.decode(dd, 'hex', 'utf16le'); // decrypt
      assert.deepEqual(b, ee, 'lodash');
      assert.notDeepEqual(b, dd, 'orig - encrypt');
      assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

      assert.deepEqual(d, dd, 'encrypt');
      assert.deepEqual(e, ee, 'decrypt');
      done();
    });
  });

  describe('array', function() {

    it('should return same array', function(done) {

      a = [ 112, 105, 112, 112, 111 ];
      b = [ 99, 105, 97, 111 ];
      var cipher = rc4('vmpc', a);
      var d = cipher.encodeArray(b); // encrypt
      var e = cipher.decodeArray(d); // decrypt
      assert.deepEqual(b, e, 'clear');
      assert.notDeepEqual(b, d, 'orig - encrypt');
      assert.notDeepEqual(e, d, 'encrypt - decrypt');

      var cipher = rc4('vmpc', a, true);
      var dd = cipher.encodeArray(b); // encrypt
      var ee = cipher.decodeArray(dd); // decrypt
      assert.deepEqual(b, ee, 'lodash');
      assert.notDeepEqual(b, dd, 'orig - encrypt');
      assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

      assert.deepEqual(d, dd, 'encrypt');
      assert.deepEqual(e, ee, 'decrypt');
      done();
    });
    it('should return same array. auto', function(done) {

      a = [ 112, 105, 112, 112, 111 ];
      b = [ 99, 105, 97, 111 ];
      var cipher = rc4('vmpc', a);
      var d = cipher.encode(b); // encrypt
      var e = cipher.decode(d); // decrypt
      assert.deepEqual(b, e, 'clear');
      assert.notDeepEqual(b, d, 'orig - encrypt');
      assert.notDeepEqual(e, d, 'encrypt - decrypt');

      var cipher = rc4('vmpc', a, true);
      var dd = cipher.encode(b); // encrypt
      var ee = cipher.decode(dd); // decrypt
      assert.deepEqual(b, ee, 'lodash');
      assert.notDeepEqual(b, dd, 'orig - encrypt');
      assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

      assert.deepEqual(d, dd, 'encrypt');
      assert.deepEqual(e, ee, 'decrypt');
      done();
    });
  });

  describe('buffer', function() {

    it('should return same buffer', function(done) {

      a = new Buffer('pippo');
      b = new Buffer('ciao');
      var cipher = rc4('vmpc', a);
      var d = cipher.encodeBuffer(b); // encrypt
      var e = cipher.decodeBuffer(d); // decrypt
      assert.deepEqual(b, e, 'clear');
      assert.notDeepEqual(b, d, 'orig - encrypt');
      assert.notDeepEqual(e, d, 'encrypt - decrypt');

      var cipher = rc4('vmpc', a, true);
      var dd = cipher.encodeBuffer(b); // encrypt
      var ee = cipher.decodeBuffer(dd); // decrypt
      assert.deepEqual(b, ee, 'lodash');
      assert.notDeepEqual(b, dd, 'orig - encrypt');
      assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

      assert.deepEqual(d, dd, 'encrypt');
      assert.deepEqual(e, ee, 'decrypt');
      done();
    });
    it('should return same buffer. auto', function(done) {

      a = new Buffer('pippo');
      b = new Buffer('ciao');
      var cipher = rc4('vmpc', a);
      var d = cipher.encode(b); // encrypt
      var e = cipher.decode(d); // decrypt
      assert.deepEqual(b, e, 'clear');
      assert.notDeepEqual(b, d, 'orig - encrypt');
      assert.notDeepEqual(e, d, 'encrypt - decrypt');

      var cipher = rc4('vmpc', a, true);
      var dd = cipher.encode(b); // encrypt
      var ee = cipher.decode(dd); // decrypt
      assert.deepEqual(b, ee, 'lodash');
      assert.notDeepEqual(b, dd, 'orig - encrypt');
      assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

      assert.deepEqual(d, dd, 'encrypt');
      assert.deepEqual(e, ee, 'decrypt');
      done();
    });
  });

  it('combine - should return combine', function(done) {

    a = new Buffer('pippo');
    b = '1';
    var cipher = rc4('vmpc', a);
    var d = cipher.codeString(b); // encrypt
    d = [ d.charCodeAt(0) ]; // string->byte
    var e = cipher.decode(d); // decrypt
    e = String.fromCharCode(e[0]); // byte -> string
    assert.deepEqual(b, e, 'clear');
    assert.notDeepEqual(b, d, 'orig - encrypt');
    assert.notDeepEqual(e, d, 'encrypt - decrypt');
    done();
  });
  it('wrong - change key', function(done) {

    a = 'pippo';
    b = 'ciao';
    var cipher = rc4('vmpc', a);
    var d = cipher.encodeString(b); // encrypt
    cipher.change('pluto'); // change key
    var e = cipher.decodeString(d); // decrypt
    assert.notDeepEqual(b, e, 'clear');
    assert.notDeepEqual(b, d, 'orig - encrypt');
    assert.notDeepEqual(e, d, 'encrypt - decrypt');
    done();
  });
  it('file - should read encrypted file', function(done) {

    var fs = require('fs');
    a = 'hex7c0';
    b = new Buffer('ciao I\'m hex7c0\nHow are you?\n:D');
    var cipher = rc4('vmpc', a);

    var d = cipher.encodeBuffer(b); // encrypt
    // use {encoding: null} when you write buffer
    fs.writeFile('crypted', d, function(err) {

      assert.ifError(err);
      // use {encoding: null} when you read buffer
      fs.readFile('crypted', function(err, data) {

        assert.ifError(err);
        var e = cipher.decodeBuffer(data); // decrypt
        assert.deepEqual(b, e, 'clear');
        assert.notDeepEqual(b, d, 'orig - encrypt');
        assert.notDeepEqual(e, d, 'encrypt - decrypt');
        fs.unlink('crypted', done);
      });
    });
  });
});
