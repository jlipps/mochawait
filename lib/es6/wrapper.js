let mochawait = {}
  , mochaIt = GLOBAL.it
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

let mochaHooks = new Map();
mochaHooks.set('before', mochaBefore);
mochaHooks.set('after', mochaAfter);
mochaHooks.set('beforeEach', mochaBeforeEach);
mochaHooks.set('afterEach', mochaAfterEach);

for (let [name, hook] of mochaHooks) {
  GLOBAL[name] = function (asyncFn) {
    hook(async function (done) {
      try {
        await asyncFn();
        done();
      } catch (e) {
        done(e);
      }
    });
  };
}
