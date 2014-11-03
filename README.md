MochAwait
=========

A [Mocha](https://github.com/visionmedia/mocha) wrapper that provides an
interface for ES7 async/await. Now you can do async test blocks without
having to worry about passing "done" everywhere!

Install:

```
npm install mochawait
```

Then:

```js
import mw from 'mochawait'
let it = mochawait.it
  , before = mw.before
  , should = require('should');

describe('My sweet project', function () {
  before(async function () {
    await doSomeTestSetup();
  });

  it('should work as expected', async function () {
    var res = await myAsyncMethod();
    res.should.equal('foo');
  });
});
```

(Where in the example above, `doSomeTestSetup` and `myAsyncMethod` are [ES7
async function](http://jakearchibald.com/2014/es7-async-functions/) or
promises)

Running tests written this way is easy: simply transpile your ES6/7 code
using [Traceur](https://github.com/google/traceur-compiler), make sure to
include the Traceur runtime (`require('traceur/bin/traceur-runtime')`), and
run with `mocha` as per usual:

```
mocha my-specs.js
```

Notice that we're simply redefining `it` and `before` to clobber Mocha's built-in one. We could also have simply done this:

```js
import mw from 'mochawait';
mw.rewrite();
```

Which rewrites the `it`, `before`, `beforeEach`, `after`, and `afterEach` globals.

## Run tests for this project:

```
npm test
```
