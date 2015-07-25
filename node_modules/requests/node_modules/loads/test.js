describe('loads', function () {
  'use strict';

  var EventEmitter = require('events').EventEmitter
    , eventstub = require('eventstub')
    , assume = require('assume')
    , loads = require('./')
    , xhr
    , ee;

  beforeEach(function () {
    xhr = eventstub('error, readystatechange, timeout, progress, load, abort');
    xhr.status = 200;

    ee = new EventEmitter();
  });

  afterEach(function () {
    xhr.removeAllListeners();
    ee.removeAllListeners();
  });

  it('is exported as a function', function () {
    assume(loads).is.a('function');
  });

  it('returns the supplied xhr', function () {
    assume(loads(xhr, ee)).equals(xhr);
  });

  it('emits `end` _after_ when an error occures', function (next) {
    next = assume.plan(2, next);

    ee
    .on('end', function (err) {
      assume(err).instanceOf(Error);
      next();
    })
    .on('error', function (e) {
      assume(e).instanceOf(Error);
    });

    loads(xhr, ee).emit('error');
  });

  it('receives the status code in the `end` event', function (next) {
    next = assume.plan(2, next);

    ee
    .on('end', function (err, status) {
      assume(err).to.be.a('undefined');
      assume(status.code).equals(200);

      next();
    });

    loads(xhr, ee).emit('load');
  });

  it('emits an `error` before `end` when `load` has an incorrect status', function (next) {
    next = assume.plan(3, next);

    ee
    .on('end', function (err) {
      assume(err).instanceOf(Error);
      next();
    })
    .on('error', function (e) {
      assume(e).instanceOf(Error);
      assume(e.message).contains('request failed');
    });

    xhr.status = 6000;
    loads(xhr, ee).emit('load');
  });

  it('emits an error when the connection is abort', function (next) {
    ee
    .on('error', function (e) {
      assume(e).instanceOf(Error);
      assume(e.message).contains('request failed');
      next();
    });

    loads(xhr, ee).emit('abort');
  });

  it('emits, timeout, error, end on connection timeout', function (next) {
    var flow = '';

    ee
    .on('timeout', function () {
      flow += 'timeout';
    })
    .on('error', function (err) {
      assume(err).is.an('error');
      flow += 'error';
    })
    .on('end', function (err) {
      assume(err).is.an('error');
      assume(flow).equals('timeouterror');
      next();
    });

    loads(xhr, ee);

    xhr.emit('timeout');
    xhr.emit('error');
    xhr.emit('end');
  });

  it('calls xhr.abort when we timeout', function (next) {
    var start = Date.now();

    xhr.timeout = 200;
    xhr.abort = function () {
      var taken = Date.now() - start;

      assume(taken).is.atleast(200);
      next();
    };

    loads(xhr, ee);
  });

  it('kills assigned event listeners & timers on end', function (next) {
    ee
    .on('end', next)
    /* istanbul ignore next */
    .on('error', function (err) {
      throw err;
    })
    /* istanbul ignore next */
    .on('timeout', function (err) {
      throw err;
    });

    xhr.timeout = 10;
    loads(xhr, ee);
    ee.emit('end');
  });

  it('emits a `stream` event when onload has data', function (next) {
    ee.on('stream', function (chunk) {
      assume(chunk).equals('foo');
      next();
    });

    xhr.status = 200;
    xhr.responseText = 'foo';
    loads(xhr, ee).emit('load');
  });

  it('cannot receive data after an end event', function (next) {
    ee
    /* istanbul ignore next */
    .on('stream', function () {
      throw new Error('I should never be called');
    })
    .on('end', next);

    loads(xhr, ee);
    xhr.emit('load');

    xhr.responseText = 'foo';
    xhr.emit('load');
  });
});
