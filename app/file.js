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
  R.pipe(R.tap(ensurePath), wfFn(R.__, buffer))(path)
);

const _readJsonProto = rfFn =>
  R.pipe(rfFn, thenIfPromise(R.pipe(R.toString, jsonParse)));

const mapZipObj = (keys, array) => R.map(R.zipObj(keys), array);

const tryParse = x => R.tryCatch(jsonParse, R.always(x))(x);

const csvParse = R.pipe(
  R.split('\n'),
  R.map(R.split(',')),
  R.converge(mapZipObj, [R.head, R.pipe(R.tail, R.map(R.map(tryParse)))])
);

const getKeysOfFirstElm = R.pipe(R.head, R.keys);

const getValuesGroupByRow = R.pipe(R.tail, R.map(R.values));

const csvStringify = R.pipe(
  R.converge(R.prepend, [getKeysOfFirstElm, getValuesGroupByRow]),
  R.tap(console.log),
  R.map(R.join(',')),
  R.join('\n')
);

const _readCsvProto = rfFn =>
  R.pipe(rfFn, thenIfPromise(R.pipe(R.toString, csvParse)));

const _writeJsonProto = R.curry((wfFn, path, buffer) =>
  R.pipe(jsonStringify, wfFn(path))(buffer)
);

const _writeCsvProto = R.curry((wfFn, path, buffer) =>
  R.pipe(csvStringify, wfFn(path))(buffer)
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

const readCsvSync = _readCsvProto(readFileSync);
const readCsv = _readCsvProto(readFile);

const writeCsvSync = _writeCsvProto(writeFileSync);
const writeCsv = _writeCsvProto(writeFile);

module.exports = {
  readFileSync,
  readFile,
  writeFileSync,
  writeFile,
  readJsonSync,
  readJson,
  writeJsonSync,
  writeJson,
  readCsvSync,
  readCsv,
  writeCsvSync,
  writeCsv
};
