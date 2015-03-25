'use strict';
/**
 * @file vmpc test
 * @module arc4
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

  var a;// key
  var b;// data

  it('string - should return some string', function(done) {

    a = 'pippo';
    b = 'ciao';
    var cipher = rc4('vmpc', a);
    var d = cipher.encodeString(b); // encrypt
    var e = cipher.decodeString(d); // decrypt
    assert.deepEqual(b, e, 'clear');
    assert.notDeepEqual(b, d, 'orig - encrypt');
    assert.notDeepEqual(e, d, 'encrypt - decrypt');

    var cipher = rc4('vmpc', a);
    var dd = cipher.encodeString(b); // encrypt
    var ee = cipher.decodeString(dd); // decrypt
    assert.deepEqual(b, ee, 'lodash');
    assert.notDeepEqual(b, dd, 'orig - encrypt');
    assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

    assert.deepEqual(d, dd, 'encrypt');
    assert.deepEqual(e, ee, 'decrypt');
    done();
  });

  it('array - should return some array', function(done) {

    a = [ 112, 105, 112, 112, 111 ];
    b = [ 99, 105, 97, 111 ];
    var cipher = rc4('vmpc', a);
    var d = cipher.codeArray(b); // encrypt
    var e = cipher.codeArray(d); // decrypt
    assert.deepEqual(b, e, 'clear');
    assert.notDeepEqual(b, d, 'orig - encrypt');
    assert.notDeepEqual(e, d, 'encrypt - decrypt');

    var cipher = rc4('vmpc', a);
    var dd = cipher.codeArray(b); // encrypt
    var ee = cipher.codeArray(dd); // decrypt
    assert.deepEqual(b, ee, 'lodash');
    assert.notDeepEqual(b, dd, 'orig - encrypt');
    assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

    assert.deepEqual(d, dd, 'encrypt');
    assert.deepEqual(e, ee, 'decrypt');
    done();
  });

  it('buffer - should return some buffer', function(done) {

    a = new Buffer('pippo');
    b = new Buffer('ciao');
    var cipher = rc4('vmpc', a);
    var d = cipher.codeBuffer(b); // encrypt
    var e = cipher.codeBuffer(d); // decrypt
    assert.deepEqual(b, e, 'clear');
    assert.notDeepEqual(b, d, 'orig - encrypt');
    assert.notDeepEqual(e, d, 'encrypt - decrypt');

    var cipher = rc4('vmpc', a);
    var dd = cipher.codeBuffer(b); // encrypt
    var ee = cipher.codeBuffer(dd); // decrypt
    assert.deepEqual(b, ee, 'lodash');
    assert.notDeepEqual(b, dd, 'orig - encrypt');
    assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

    assert.deepEqual(d, dd, 'encrypt');
    assert.deepEqual(e, ee, 'decrypt');
    done();
  });

  it('combine - should return combine', function(done) {

    a = new Buffer('pippo');
    b = '1';
    var cipher = rc4('vmpc', a);
    var d = cipher.code(b); // encrypt
    d = [ d.charCodeAt(0) ]; // string->byte
    var e = cipher.code(d); // decrypt
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

    var d = cipher.codeBuffer(b); // encrypt
    // use {encoding: null} when you write buffer
    fs.writeFile('crypted', d, {
      encoding: null
    }, function(err) {

      if (err) return done(err);
      // use {encoding: null} when you read buffer
      fs.readFile('crypted', {
        encoding: null
      }, function(err, data) {

        if (err) return done(err);
        var e = cipher.codeBuffer(data); // decrypt
        assert.deepEqual(b, e, 'clear');
        assert.notDeepEqual(b, d, 'orig - encrypt');
        assert.notDeepEqual(e, d, 'encrypt - decrypt');
        fs.unlink('crypted', function() {

          done();
        });
      });
    });
  });
});
