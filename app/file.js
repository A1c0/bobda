const fs = require('fs');
const R = require('ramda');

const {thenIfPromise} = require('./promise');

const jsonParse = R.bind(JSON.parse, JSON);
const jsonStringify = R.bind(JSON.stringify, JSON);

const isPathDoNotExists = R.complement(R.unary(fs.existsSync));
const createPath = R.unary(fs.mkdirSync);
const ensureDir = R.when(isPathDoNotExists, createPath);

const appender = (a, b) => [a + '/' + b, a + '/' + b];

const ensurePath = R.pipe(
  R.split('/'),
  R.dropLast(1),
  R.mapAccum(appender, ''),
  R.last,
  R.map(R.drop(1)),
  R.forEach(ensureDir)
);

const _writeFileProto = R.curry((wfFn, path, buffer) =>
  R.pipe(
    R.tap(ensurePath),
    wfFn(R.__, buffer)
  )(path)
);

const _readJsonProto = rfFn =>
  R.pipe(
    rfFn,
    thenIfPromise(
      R.pipe(
        R.toString,
        jsonParse
      )
    )
  );

const _writeJsonProto = R.curry((wfFn, path, buffer) =>
  R.pipe(
    jsonStringify,
    wfFn(path)
  )(buffer)
);

const _writeFileSync = R.curry(R.binary(fs.writeFileSync));
const _writeFile = R.curry(R.binary(fs.writeFile));

const readFileSync = R.unary(fs.readFileSync);
const readFile = R.unary(fs.readFile);

const writeFileSync = _writeFileProto(_writeFileSync);
const writeFile = _writeFileProto(_writeFile);

const readJsonSync = _readJsonProto(readFileSync);
const readJson = _readJsonProto(readFile);

const writeJsonSync = _writeJsonProto(writeFileSync);
const writeJson = _writeJsonProto(writeFile);

module.exports = {
  readFileSync,
  readFile,
  writeFileSync,
  writeFile,
  readJsonSync,
  readJson,
  writeJsonSync,
  writeJson
};
