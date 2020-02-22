const R = require('ramda');

const promiseAll = R.bind(Promise.all, Promise);

const _awaitAllPromiseValues = R.pipe(
  R.values,
  promiseAll
);

const promiseProps = R.pipe(
  R.juxt([R.keys, _awaitAllPromiseValues]),
  R.pipe(
    promiseAll,
    R.andThen(R.apply(R.zipObj))
  )
);

const promiseMap = R.curry((fn, list) =>
  R.pipe(
    R.map(fn),
    promiseAll
  )(list)
);

const renameProp = (from, to) =>
  R.pipe(
    R.converge(R.assoc(to), [R.prop(from), R.identity]),
    R.dissoc(from)
  );

const renamePath = R.curry((from, to, obj) =>
  R.pipe(
    R.converge(R.assocPath(to), [R.path(from), R.identity]),
    R.dissocPath(from)
  )(obj)
);

const multiPath = R.curry((mappingRename, objToRename) =>
  R.reduce(
    (acc, [oldPath, newPath]) => renamePath(oldPath, newPath, acc),
    objToRename,
    mappingRename
  )
);

module.exports = {
  promiseProps,
  promiseMap,
  promiseAll,
  renameProp,
  renamePath,
  multiPath
};
