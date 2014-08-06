"use strict";
/**
 * @file arc4 test
 * @module arc4
 * @package arc4
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var rc4 = require('../index.min.js'); // use require('arc4') instead
    var _ = require('lodash'); // cache
    var assert = require('assert');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}
// load
var a = 'very_long_key_SuPeR_s1cu73';
var b = 'Loremipsumdolorsitamet,consecteturadipiscingelit.Integerluctusarcuvitaeplaceratinterdum.Fuscenecconvallisleo.Vivamusacconsequatfelis,euultriciesquam.Nullapretiumdiamquisviverratincidunt.Nuncidanteultrices,auctorauguein,rhoncusdui.Maurisvulputateaorcieufacilisis.Quisquepharetraporttitornisi,necdapibusrisusfeugiatvitae.Proinegeturnasitametmagnasempertempussedeuaugue.Maecenasetlectusegetmetusmolestieconsecteturetsitametmauris.Praesentaanteinligulainterdumcommodo.Sedconsequatlacusvitaepharetravolutpat.Praesentvelaugueactortorsollicitudinposuereeusitamet.';
var aa = [112,105,112,112,111,112,105,112,112,111,112,105,112,112,111];
var bb = [99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,
        111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,
        111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,
        111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,
        111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,
        111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,
        111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,
        111,99,105,97,111,99,105,97,111,99,105,97,111,99,105,97,111];
var aaa = new Buffer('very_long_key_SuPeR_s1cu73');
var bbb = new Buffer(
        'Loremipsumdolorsitamet,consecteturadipiscingelit.Integerluctusarcuvitaeplaceratinterdum.Fuscenecconvallisleo.Vivamusacconsequatfelis,euultriciesquam.Nullapretiumdiamquisviverratincidunt.Nuncidanteultrices,auctorauguein,rhoncusdui.Maurisvulputateaorcieufacilisis.Quisquepharetraporttitornisi,necdapibusrisusfeugiatvitae.Proinegeturnasitametmagnasempertempussedeuaugue.Maecenasetlectusegetmetusmolestieconsecteturetsitametmauris.Praesentaanteinligulainterdumcommodo.Sedconsequatlacusvitaepharetravolutpat.Praesentvelaugueactortorsollicitudinposuereeusitamet.');

/*
 * test module
 */
describe('performance',function() {

    describe('arc4',function() {

        describe('string',function() {

            it('normal - should return same string',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(a);
                    var d = cipher.codeString(b); // encrypt
                    var e = cipher.codeString(d); // decrypt
                    assert.deepEqual(b,e,'clear');
                    assert.notDeepEqual(b,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(b);
                    var d = cipher.codeString(a); // encrypt
                    var e = cipher.codeString(d); // decrypt
                    assert.deepEqual(a,e,'clear');
                    assert.notDeepEqual(a,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tstring normal took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });

            it('lodash - should return same string',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(a,true);
                    var d = cipher.codeString(b); // encrypt
                    var e = cipher.codeString(d); // decrypt
                    assert.deepEqual(b,e,'clear');
                    assert.notDeepEqual(b,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(b,true);
                    var d = cipher.codeString(a); // encrypt
                    var e = cipher.codeString(d); // decrypt
                    assert.deepEqual(a,e,'clear');
                    assert.notDeepEqual(a,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tstring lodash took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });
        });

        describe('array',function() {

            it('normal - should return same array',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aa);
                    var d = cipher.codeArray(bb); // encrypt
                    var e = cipher.codeArray(d); // decrypt
                    assert.deepEqual(bb,e,'clear');
                    assert.notDeepEqual(bb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bb);
                    var d = cipher.codeArray(aa); // encrypt
                    var e = cipher.codeArray(d); // decrypt
                    assert.deepEqual(aa,e,'clear');
                    assert.notDeepEqual(aa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tarray normal took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });

            it('lodash - should return same array',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aa,true);
                    var d = cipher.codeArray(bb); // encrypt
                    var e = cipher.codeArray(d); // decrypt
                    assert.deepEqual(bb,e,'clear');
                    assert.notDeepEqual(bb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bb,true);
                    var d = cipher.codeArray(aa); // encrypt
                    var e = cipher.codeArray(d); // decrypt
                    assert.deepEqual(aa,e,'clear');
                    assert.notDeepEqual(aa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tarray lodash took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });
        });

        describe('buffer',function() {

            it('normal - should return same buffer',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aaa);
                    var d = cipher.codeBuffer(bbb); // encrypt
                    var e = cipher.codeBuffer(d); // decrypt
                    assert.deepEqual(bbb,e,'clear');
                    assert.notDeepEqual(bbb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bbb);
                    var d = cipher.codeBuffer(aaa); // encrypt
                    var e = cipher.codeBuffer(d); // decrypt
                    assert.deepEqual(aaa,e,'clear');
                    assert.notDeepEqual(aaa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tbuffer normal took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });

            it('lodash - should return same buffer',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aaa,true);
                    var d = cipher.codeBuffer(bbb); // encrypt
                    var e = cipher.codeBuffer(d); // decrypt
                    assert.deepEqual(bbb,e,'clear');
                    assert.notDeepEqual(bbb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bbb,true);
                    var d = cipher.codeBuffer(aaa); // encrypt
                    var e = cipher.codeBuffer(d); // decrypt
                    assert.deepEqual(aaa,e,'clear');
                    assert.notDeepEqual(aaa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tbuffer lodash took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });
        });
    });

    describe('arc4a',function() {

        describe('string',function() {

            it('normal - should return same string',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(a);
                    var d = cipher.codeStringRC4A(b); // encrypt
                    var e = cipher.codeStringRC4A(d); // decrypt
                    assert.deepEqual(b,e,'clear');
                    assert.notDeepEqual(b,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(b);
                    var d = cipher.codeStringRC4A(a); // encrypt
                    var e = cipher.codeStringRC4A(d); // decrypt
                    assert.deepEqual(a,e,'clear');
                    assert.notDeepEqual(a,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tstring normal took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });

            it('lodash - should return same string',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(a,true);
                    var d = cipher.codeStringRC4A(b); // encrypt
                    var e = cipher.codeStringRC4A(d); // decrypt
                    assert.deepEqual(b,e,'clear');
                    assert.notDeepEqual(b,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(b,true);
                    var d = cipher.codeStringRC4A(a); // encrypt
                    var e = cipher.codeStringRC4A(d); // decrypt
                    assert.deepEqual(a,e,'clear');
                    assert.notDeepEqual(a,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tstring lodash took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });
        });

        describe('array',function() {

            it('normal - should return same array',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aa);
                    var d = cipher.codeArrayRC4A(bb); // encrypt
                    var e = cipher.codeArrayRC4A(d); // decrypt
                    assert.deepEqual(bb,e,'clear');
                    assert.notDeepEqual(bb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tarray normal took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });

            it('lodash - should return same array',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aa,true);
                    var d = cipher.codeArrayRC4A(bb); // encrypt
                    var e = cipher.codeArrayRC4A(d); // decrypt
                    assert.deepEqual(bb,e,'clear');
                    assert.notDeepEqual(bb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tarray lodash took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });
        });

        describe('buffer',function() {

            it('normal - should return same buffer',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aaa);
                    var d = cipher.codeBufferRC4A(bbb); // encrypt
                    var e = cipher.codeBufferRC4A(d); // decrypt
                    assert.deepEqual(bbb,e,'clear');
                    assert.notDeepEqual(bbb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bbb);
                    var d = cipher.codeBufferRC4A(aaa); // encrypt
                    var e = cipher.codeBufferRC4A(d); // decrypt
                    assert.deepEqual(aaa,e,'clear');
                    assert.notDeepEqual(aaa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tbuffer normal took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });

            it('lodash - should return same buffer',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aaa,true);
                    var d = cipher.codeBufferRC4A(bbb); // encrypt
                    var e = cipher.codeBufferRC4A(d); // decrypt
                    assert.deepEqual(bbb,e,'clear');
                    assert.notDeepEqual(bbb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bbb,true);
                    var d = cipher.codeBufferRC4A(aaa); // encrypt
                    var e = cipher.codeBufferRC4A(d); // decrypt
                    assert.deepEqual(aaa,e,'clear');
                    assert.notDeepEqual(aaa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tbuffer lodash took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });
        });
    });

    describe('vmpc',function() {

        describe('string',function() {

            it('normal - should return same string',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(a);
                    var d = cipher.codeStringVMPC(b); // encrypt
                    var e = cipher.codeStringVMPC(d); // decrypt
                    assert.deepEqual(b,e,'clear');
                    assert.notDeepEqual(b,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(b);
                    var d = cipher.codeStringVMPC(a); // encrypt
                    var e = cipher.codeStringVMPC(d); // decrypt
                    assert.deepEqual(a,e,'clear');
                    assert.notDeepEqual(a,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tstring normal took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });

            it('lodash - should return same string',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(a,true);
                    var d = cipher.codeStringVMPC(b); // encrypt
                    var e = cipher.codeStringVMPC(d); // decrypt
                    assert.deepEqual(b,e,'clear');
                    assert.notDeepEqual(b,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(b,true);
                    var d = cipher.codeStringVMPC(a); // encrypt
                    var e = cipher.codeStringVMPC(d); // decrypt
                    assert.deepEqual(a,e,'clear');
                    assert.notDeepEqual(a,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tstring lodash took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });
        });

        describe('array',function() {

            it('normal - should return same array',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aa);
                    var d = cipher.codeArrayVMPC(bb); // encrypt
                    var e = cipher.codeArrayVMPC(d); // decrypt
                    assert.deepEqual(bb,e,'clear');
                    assert.notDeepEqual(bb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bb);
                    var d = cipher.codeArrayVMPC(aa); // encrypt
                    var e = cipher.codeArrayVMPC(d); // decrypt
                    assert.deepEqual(aa,e,'clear');
                    assert.notDeepEqual(aa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tarray normal took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });

            it('lodash - should return same array',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aa,true);
                    var d = cipher.codeArrayVMPC(bb); // encrypt
                    var e = cipher.codeArrayVMPC(d); // decrypt
                    assert.deepEqual(bb,e,'clear');
                    assert.notDeepEqual(bb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bb,true);
                    var d = cipher.codeArrayVMPC(aa); // encrypt
                    var e = cipher.codeArrayVMPC(d); // decrypt
                    assert.deepEqual(aa,e,'clear');
                    assert.notDeepEqual(aa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tarray lodash took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });
        });

        describe('buffer',function() {

            it('normal - should return same buffer',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aaa);
                    var d = cipher.codeBufferVMPC(bbb); // encrypt
                    var e = cipher.codeBufferVMPC(d); // decrypt
                    assert.deepEqual(bbb,e,'clear');
                    assert.notDeepEqual(bbb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bbb);
                    var d = cipher.codeBufferVMPC(aaa); // encrypt
                    var e = cipher.codeBufferVMPC(d); // decrypt
                    assert.deepEqual(aaa,e,'clear');
                    assert.notDeepEqual(aaa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tbuffer normal took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });

            it('lodash - should return same buffer',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aaa,true);
                    var d = cipher.codeBufferVMPC(bbb); // encrypt
                    var e = cipher.codeBufferVMPC(d); // decrypt
                    assert.deepEqual(bbb,e,'clear');
                    assert.notDeepEqual(bbb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bbb,true);
                    var d = cipher.codeBufferVMPC(aaa); // encrypt
                    var e = cipher.codeBufferVMPC(d); // decrypt
                    assert.deepEqual(aaa,e,'clear');
                    assert.notDeepEqual(aaa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tbuffer lodash took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });
        });
    });

    describe('arc4p',function() {

        describe('string',function() {

            it('normal - should return same string',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(a);
                    var d = cipher.codeStringRC4P(b); // encrypt
                    var e = cipher.codeStringRC4P(d); // decrypt
                    assert.deepEqual(b,e,'clear');
                    assert.notDeepEqual(b,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(b);
                    var d = cipher.codeStringRC4P(a); // encrypt
                    var e = cipher.codeStringRC4P(d); // decrypt
                    assert.deepEqual(a,e,'clear');
                    assert.notDeepEqual(a,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tstring normal took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });

            it('lodash - should return same string',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(a,true);
                    var d = cipher.codeStringRC4P(b); // encrypt
                    var e = cipher.codeStringRC4P(d); // decrypt
                    assert.deepEqual(b,e,'clear');
                    assert.notDeepEqual(b,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(b,true);
                    var d = cipher.codeStringRC4P(a); // encrypt
                    var e = cipher.codeStringRC4P(d); // decrypt
                    assert.deepEqual(a,e,'clear');
                    assert.notDeepEqual(a,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tstring lodash took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });
        });

        describe('array',function() {

            it('normal - should return same array',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aa);
                    var d = cipher.codeArrayRC4P(bb); // encrypt
                    var e = cipher.codeArrayRC4P(d); // decrypt
                    assert.deepEqual(bb,e,'clear');
                    assert.notDeepEqual(bb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bb);
                    var d = cipher.codeArrayRC4P(aa); // encrypt
                    var e = cipher.codeArrayRC4P(d); // decrypt
                    assert.deepEqual(aa,e,'clear');
                    assert.notDeepEqual(aa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tarray normal took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });

            it('lodash - should return same array',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aa,true);
                    var d = cipher.codeArrayRC4P(bb); // encrypt
                    var e = cipher.codeArrayRC4P(d); // decrypt
                    assert.deepEqual(bb,e,'clear');
                    assert.notDeepEqual(bb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bb,true);
                    var d = cipher.codeArrayRC4P(aa); // encrypt
                    var e = cipher.codeArrayRC4P(d); // decrypt
                    assert.deepEqual(aa,e,'clear');
                    assert.notDeepEqual(aa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tarray lodash took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });
        });

        describe('buffer',function() {

            it('normal - should return same buffer',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aaa);
                    var d = cipher.codeBufferRC4P(bbb); // encrypt
                    var e = cipher.codeBufferRC4P(d); // decrypt
                    assert.deepEqual(bbb,e,'clear');
                    assert.notDeepEqual(bbb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bbb);
                    var d = cipher.codeBufferRC4P(aaa); // encrypt
                    var e = cipher.codeBufferRC4P(d); // decrypt
                    assert.deepEqual(aaa,e,'clear');
                    assert.notDeepEqual(aaa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tbuffer normal took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });

            it('lodash - should return same buffer',function(done) {

                var start = process.hrtime();
                for (var i = 0; i < 10; i++) {

                    var cipher = rc4(aaa,true);
                    var d = cipher.codeBufferRC4P(bbb); // encrypt
                    var e = cipher.codeBufferRC4P(d); // decrypt
                    assert.deepEqual(bbb,e,'clear');
                    assert.notDeepEqual(bbb,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                    // reverse
                    var cipher = rc4(bbb,true);
                    var d = cipher.codeBufferRC4P(aaa); // encrypt
                    var e = cipher.codeBufferRC4P(d); // decrypt
                    assert.deepEqual(aaa,e,'clear');
                    assert.notDeepEqual(aaa,d,'orig - encrypt');
                    assert.notDeepEqual(e,d,'encrypt - decrypt');
                }
                var diff = process.hrtime(start);
                console.log('\tbuffer lodash took %d ms',
                        ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
                done();
            });
        });
    });

});
