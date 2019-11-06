const R = require('ramda');

const renameProp = R.curry((from, to) =>
  R.pipe(
    R.converge(R.assoc(to), [R.prop(from), R.identity]),
    R.dissoc(from)
  )
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

module.exports = {renameProp, renamePath, multiPath};
