const R = require('ramda');

const promiseAll = R.bind(Promise.all, Promise);

const _awaitAllPromiseValues = R.pipe(
  R.values,
  promiseAll
);

const promiseProps = R.pipe(
  R.juxt([R.keys, _awaitAllPromiseValues]),
  promiseAll,
  R.then(R.apply(R.zipObj))
);

const promiseMap = R.curry((fn, list) =>
  R.pipe(
    R.map(fn),
    promiseAll
  )(list)
);

const _isPromise = R.pipe(
  R.type,
  R.equals('Promise')
);
const thenIfPromise = pipe => R.ifElse(_isPromise, R.then(pipe), pipe);

module.exports = {promiseAll, promiseMap, promiseProps, thenIfPromise};
