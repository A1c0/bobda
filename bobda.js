const R = require('ramda');
const Bromise = require('bluebird');

const bromiseMap = R.flip(R.binary(Bromise.map));
const bromiseProps = Bromise.props;
const bromiseAll = Bromise.all;

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
  bromiseProps,
  bromiseMap,
  bromiseAll,
  renameProp,
  renamePath,
  multiPath
};
