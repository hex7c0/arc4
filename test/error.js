'use strict';
/**
 * @file error test
 * @module arc4
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
var arc4 = require('..');
var assert = require('assert');

/*
 * test module
 */
describe('error', function() {

  describe('password', function() {

    describe('normal', function() {

      it('should return "algorithm" Exception, arc4', function(done) {

        try {
          arc4('arc4');
        } catch (err) {
          assert.equal(err.message, 'password required');
          done();
        }
      });
      it('should return "algorithm" Exception, rc4a', function(done) {

        try {
          arc4('rc4a');
        } catch (err) {
          assert.equal(err.message, 'password required');
          done();
        }
      });
      it('should return "algorithm" Exception, vmpc', function(done) {

        try {
          arc4('vmpc');
        } catch (err) {
          assert.equal(err.message, 'password required');
          done();
        }
      });
      it('should return "algorithm" Exception, rc4+', function(done) {

        try {
          arc4('rc4+');
        } catch (err) {
          assert.equal(err.message, 'password required');
          done();
        }
      });
    });

    describe('lodash', function() {

      it('should return "algorithm" Exception, arc4', function(done) {

        try {
          arc4('arc4', null, true);
        } catch (err) {
          assert.equal(err.message, 'password required');
          done();
        }
      });
      it('should return "algorithm" Exception, rc4a', function(done) {

        try {
          arc4('rc4a', null, true);
        } catch (err) {
          assert.equal(err.message, 'password required');
          done();
        }
      });
      it('should return "algorithm" Exception, vmpc', function(done) {

        try {
          arc4('vmpc', null, true);
        } catch (err) {
          assert.equal(err.message, 'password required');
          done();
        }
      });
      it('should return "algorithm" Exception, rc4+', function(done) {

        try {
          arc4('rc4+', null, true);
        } catch (err) {
          assert.equal(err.message, 'password required');
          done();
        }
      });
    });
  });

  describe('algorithm', function() {

    it('should return "algorithm" Exception, empty', function(done) {

      try {
        arc4();
      } catch (err) {
        assert.equal(err.message, 'algorithm required');
        done();
      }
    });
    it('should return "algorithm" Exception, empty. lodash', function(done) {

      try {
        arc4(null, null, true);
      } catch (err) {
        assert.equal(err.message, 'algorithm required');
        done();
      }
    });
    it('should return "algorithm" Exception, wrong', function(done) {

      try {
        arc4('foo', 'foo');
      } catch (err) {
        assert.equal(err.message, 'algorithm required');
        done();
      }
    });
    it('should return "algorithm" Exception, wrong. lodash', function(done) {

      try {
        arc4('foo', 'foo', true);
      } catch (err) {
        assert.equal(err.message, 'algorithm required');
        done();
      }
    });
  });
});
