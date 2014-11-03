let _ = require('lodash')
  , Q = require('q')
  , mochawait = {};

let mochaIt = GLOBAL.it
  , mochaBefore = GLOBAL.before
  , mochaBeforeEach = GLOBAL.beforeEach
  , mochaAfter = GLOBAL.after
  , mochaAfterEach = GLOBAL.afterEach;

mochawait.it = function (desc, asyncFn) {
  mochaIt(desc, async function (done) {
    try {
      await asyncFn();
      done();
    } catch (e) {
      done(e);
    }
  });
};

var mochaHooks = {
  before: mochaBefore,
  after: mochaAfter,
  beforeEach: mochaBeforeEach,
  afterEach: mochaAfterEach
};

_.each(mochaHooks, function (hook, name) {
  mochawait[name] = function (asyncFn) {
    hook(async function (done) {
      try {
        await asyncFn();
        done();
      } catch (e) {
        done(e);
      }
    });
  };
});

mochawait.rewrite = function () {
  GLOBAL.before = mochawait.before;
  GLOBAL.after = mochawait.after;
  GLOBAL.beforeEach = mochawait.beforeEach;
  GLOBAL.afterEach = mochawait.afterEach;
  GLOBAL.it = mochawait.it;
};

export default mochawait;
