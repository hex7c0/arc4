'use strict';
/**
 * @file benchmark test
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
var _ = require('lodash'); // cache
var assert = require('assert');
// load
var a = 'very_long_key_SuPeR_s1cu73';
var b = 'Loremipsumdolorsitamet,consecteturadipiscingelit.Integerluctusarcuvitaeplaceratinterdum.Fuscenecconvallisleo.Vivamusacconsequatfelis,euultriciesquam.Nullapretiumdiamquisviverratincidunt.Nuncidanteultrices,auctorauguein,rhoncusdui.Maurisvulputateaorcieufacilisis.Quisquepharetraporttitornisi,necdapibusrisusfeugiatvitae.Proinegeturnasitametmagnasempertempussedeuaugue.Maecenasetlectusegetmetusmolestieconsecteturetsitametmauris.Praesentaanteinligulainterdumcommodo.Sedconsequatlacusvitaepharetravolutpat.Praesentvelaugueactortorsollicitudinposuereeusitamet.';
var aa = [ 112, 105, 112, 112, 111, 112, 105, 112, 112, 111, 112, 105, 112,
  112, 111 ];
var bb = [ 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97,
  111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111,
  99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99,
  105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105,
  97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97,
  111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111,
  99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99,
  105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105,
  97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97,
  111, 99, 105, 97, 111 ];
var aaa = new Buffer('very_long_key_SuPeR_s1cu73');
var bbb = new Buffer(
  'Loremipsumdolorsitamet,consecteturadipiscingelit.Integerluctusarcuvitaeplaceratinterdum.Fuscenecconvallisleo.Vivamusacconsequatfelis,euultriciesquam.Nullapretiumdiamquisviverratincidunt.Nuncidanteultrices,auctorauguein,rhoncusdui.Maurisvulputateaorcieufacilisis.Quisquepharetraporttitornisi,necdapibusrisusfeugiatvitae.Proinegeturnasitametmagnasempertempussedeuaugue.Maecenasetlectusegetmetusmolestieconsecteturetsitametmauris.Praesentaanteinligulainterdumcommodo.Sedconsequatlacusvitaepharetravolutpat.Praesentvelaugueactortorsollicitudinposuereeusitamet.');

/*
 * test module
 */
describe('benchmark', function() {

  describe('arc4', function() {

    describe('string', function() {

      it('normal - should return same string', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('arc4', a);
          var d = cipher.encodeString(b); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(b, e, 'clear');
          assert.notDeepEqual(b, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('arc4', b);
          var d = cipher.encodeString(a); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(a, e, 'clear');
          assert.notDeepEqual(a, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tstring normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same string', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('arc4', a, true);
          var d = cipher.encodeString(b); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(b, e, 'clear');
          assert.notDeepEqual(b, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('arc4', b, true);
          var d = cipher.encodeString(a); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(a, e, 'clear');
          assert.notDeepEqual(a, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tstring lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });

    describe('array', function() {

      it('normal - should return same array', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('arc4', aa);
          var d = cipher.codeArray(bb); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(bb, e, 'clear');
          assert.notDeepEqual(bb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('arc4', bb);
          var d = cipher.codeArray(aa); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(aa, e, 'clear');
          assert.notDeepEqual(aa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tarray normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same array', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('arc4', aa, true);
          var d = cipher.codeArray(bb); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(bb, e, 'clear');
          assert.notDeepEqual(bb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('arc4', bb, true);
          var d = cipher.codeArray(aa); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(aa, e, 'clear');
          assert.notDeepEqual(aa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tarray lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });

    describe('buffer', function() {

      it('normal - should return same buffer', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('arc4', aaa);
          var d = cipher.codeBuffer(bbb); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(bbb, e, 'clear');
          assert.notDeepEqual(bbb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('arc4', bbb);
          var d = cipher.codeBuffer(aaa); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(aaa, e, 'clear');
          assert.notDeepEqual(aaa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tbuffer normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same buffer', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('arc4', aaa, true);
          var d = cipher.codeBuffer(bbb); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(bbb, e, 'clear');
          assert.notDeepEqual(bbb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('arc4', bbb, true);
          var d = cipher.codeBuffer(aaa); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(aaa, e, 'clear');
          assert.notDeepEqual(aaa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tbuffer lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });
  });

  describe('rc4a', function() {

    describe('string', function() {

      it('normal - should return same string', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('rc4a', a);
          var d = cipher.encodeString(b); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(b, e, 'clear');
          assert.notDeepEqual(b, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('rc4a', b);
          var d = cipher.encodeString(a); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(a, e, 'clear');
          assert.notDeepEqual(a, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tstring normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same string', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('rc4a', a, true);
          var d = cipher.encodeString(b); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(b, e, 'clear');
          assert.notDeepEqual(b, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('rc4a', b, true);
          var d = cipher.encodeString(a); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(a, e, 'clear');
          assert.notDeepEqual(a, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tstring lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });

    describe('array', function() {

      it('normal - should return same array', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('rc4a', aa);
          var d = cipher.codeArray(bb); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(bb, e, 'clear');
          assert.notDeepEqual(bb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tarray normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same array', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('rc4a', aa, true);
          var d = cipher.codeArray(bb); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(bb, e, 'clear');
          assert.notDeepEqual(bb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tarray lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });

    describe('buffer', function() {

      it('normal - should return same buffer', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('rc4a', aaa);
          var d = cipher.codeBuffer(bbb); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(bbb, e, 'clear');
          assert.notDeepEqual(bbb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('rc4a', bbb);
          var d = cipher.codeBuffer(aaa); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(aaa, e, 'clear');
          assert.notDeepEqual(aaa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tbuffer normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same buffer', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('rc4a', aaa, true);
          var d = cipher.codeBuffer(bbb); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(bbb, e, 'clear');
          assert.notDeepEqual(bbb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('rc4a', bbb, true);
          var d = cipher.codeBuffer(aaa); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(aaa, e, 'clear');
          assert.notDeepEqual(aaa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tbuffer lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });
  });

  describe('vmpc', function() {

    describe('string', function() {

      it('normal - should return same string', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('vmpc', a);
          var d = cipher.encodeString(b); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(b, e, 'clear');
          assert.notDeepEqual(b, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('vmpc', b);
          var d = cipher.encodeString(a); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(a, e, 'clear');
          assert.notDeepEqual(a, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tstring normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same string', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('vmpc', a, true);
          var d = cipher.encodeString(b); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(b, e, 'clear');
          assert.notDeepEqual(b, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('vmpc', b, true);
          var d = cipher.encodeString(a); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(a, e, 'clear');
          assert.notDeepEqual(a, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tstring lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });

    describe('array', function() {

      it('normal - should return same array', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('vmpc', aa);
          var d = cipher.codeArray(bb); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(bb, e, 'clear');
          assert.notDeepEqual(bb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('vmpc', bb);
          var d = cipher.codeArray(aa); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(aa, e, 'clear');
          assert.notDeepEqual(aa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tarray normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same array', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('vmpc', aa, true);
          var d = cipher.codeArray(bb); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(bb, e, 'clear');
          assert.notDeepEqual(bb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('vmpc', bb, true);
          var d = cipher.codeArray(aa); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(aa, e, 'clear');
          assert.notDeepEqual(aa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tarray lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });

    describe('buffer', function() {

      it('normal - should return same buffer', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('vmpc', aaa);
          var d = cipher.codeBuffer(bbb); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(bbb, e, 'clear');
          assert.notDeepEqual(bbb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('vmpc', bbb);
          var d = cipher.codeBuffer(aaa); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(aaa, e, 'clear');
          assert.notDeepEqual(aaa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tbuffer normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same buffer', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('vmpc', aaa, true);
          var d = cipher.codeBuffer(bbb); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(bbb, e, 'clear');
          assert.notDeepEqual(bbb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('vmpc', bbb, true);
          var d = cipher.codeBuffer(aaa); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(aaa, e, 'clear');
          assert.notDeepEqual(aaa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tbuffer lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });
  });

  describe('rc4+', function() {

    describe('string', function() {

      it('normal - should return same string', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('rc4+', a);
          var d = cipher.encodeString(b); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(b, e, 'clear');
          assert.notDeepEqual(b, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('rc4+', b);
          var d = cipher.encodeString(a); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(a, e, 'clear');
          assert.notDeepEqual(a, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tstring normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same string', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('rc4+', a, true);
          var d = cipher.encodeString(b); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(b, e, 'clear');
          assert.notDeepEqual(b, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('rc4+', b, true);
          var d = cipher.encodeString(a); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(a, e, 'clear');
          assert.notDeepEqual(a, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tstring lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });

    describe('array', function() {

      it('normal - should return same array', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('rc4+', aa);
          var d = cipher.codeArray(bb); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(bb, e, 'clear');
          assert.notDeepEqual(bb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('rc4+', bb);
          var d = cipher.codeArray(aa); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(aa, e, 'clear');
          assert.notDeepEqual(aa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tarray normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same array', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('rc4+', aa, true);
          var d = cipher.codeArray(bb); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(bb, e, 'clear');
          assert.notDeepEqual(bb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('rc4+', bb, true);
          var d = cipher.codeArray(aa); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(aa, e, 'clear');
          assert.notDeepEqual(aa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tarray lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });

    describe('buffer', function() {

      it('normal - should return same buffer', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('rc4+', aaa);
          var d = cipher.codeBuffer(bbb); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(bbb, e, 'clear');
          assert.notDeepEqual(bbb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('rc4+', bbb);
          var d = cipher.codeBuffer(aaa); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(aaa, e, 'clear');
          assert.notDeepEqual(aaa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tbuffer normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same buffer', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = rc4('rc4+', aaa, true);
          var d = cipher.codeBuffer(bbb); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(bbb, e, 'clear');
          assert.notDeepEqual(bbb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = rc4('rc4+', bbb, true);
          var d = cipher.codeBuffer(aaa); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(aaa, e, 'clear');
          assert.notDeepEqual(aaa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tbuffer lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });
  });

});
