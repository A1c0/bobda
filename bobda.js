
const R = require('ramda');
const Maybe = require('sanctuary-maybe');

/**
 * Extract value from object from first wanted, defaulting to other values
 * @param {Array} - two dimensional array defaulting to following paths
 * @param {Object} - Object from which we extract the data
 * @returns The first data found, else Nothing
 */
const chainedDefaultTo = R.curry((pathsList, extractedObject) =>
  R.pipe(R.paths, R.reduce(R.defaultTo, Maybe.Nothing))(
    R.reverse(pathsList),
    extractedObject
  )
);

const {
  readFileSync,
  readFile,
  writeFileSync,
  writeFile,
  readJsonSync,
  readJson,
  writeJsonSync,
  writeJson
} = require('./app/file');

const {
  promiseAll,
  promiseMap,
  promiseProps,
  thenIfPromise
} = require('./app/promise');

const {renameProp, renamePath, multiPath} = require('./app/props');

module.exports = {
  chainedDefaultTo,
  readFileSync,
  readFile,
  writeFileSync,
  writeFile,
  readJsonSync,
  readJson,
  writeJsonSync,
  writeJson,
  promiseProps,
  promiseMap,
  promiseAll,
  promiseMap,
  promiseProps,
  thenIfPromise,
  renameProp,
  renamePath,
  multiPath
};
