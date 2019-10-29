const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
const R = require('ramda');
const {
  promiseAll,
  promiseMap,
  promiseProps,
  renamePath,
  renameProp,
  multiPath
} = require('../bobda');

const {objTest, objPropRenamed, objFullRenamed} = require('./data/data');

const incrementAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(++value), 30));

const squareAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(value * value), 30));

const value = 2;

const array = [2, 3, 4, 5];

chai.should();
chai.use(deepEqualInAnyOrder);

describe('test bobda', () => {
  describe('#promiseAll', () => {
    it('should return a promise', async () => {
      (await promiseAll(
        R.juxt([incrementAsync, squareAsync])(value)
      )).should.be.eql([3, 4]);
    });
  });

  describe('#promiseMap', () => {
    it('should return a promise', async () => {
      (await promiseMap(incrementAsync)(array)).should.be.eql([3, 4, 5, 6]);
    });
  });

  describe('#promiseProps', () => {
    it('should return a promise', async () => {
      (await promiseProps(
        R.applySpec({val: incrementAsync})(value)
      )).should.be.eql({val: 3});
    });
  });

  describe('#renameProp', () => {
    it('should rename prop from an object to the specified name', () => {
      const foo = R.pipe(renameProp('propString', 'chapi'));
      foo(objTest).should.eql(objPropRenamed);
    });
  });

  describe('#renameProp', () => {
    it('should rename prop from an object to the specified name', () => {
      const foo = R.pipe(
        renameProp('propString', 'chapi'),
        renamePath(['propObj', 'propBool'], ['chapo', 'patapo'])
      );
      foo(objTest).should.eql(objFullRenamed);
    });
  });

  describe('#multiPath', () => {
    it('should apply renamePath  for list', () => {
      const listOfPaths = [
        [['une', 'souris', 'verte'], ['qui', 'courait', 'dans']],
        [['l', 'herbe'], ['je', 'la', 'montre']],
        [['a', 'ces'], ['messieurs']]
      ];

      const inObj = {
        une: {souris: {verte: true}},
        l: {herbe: false},
        a: {ces: 0}
      };

      const outObj = {
        qui: {courait: {dans: true}},
        je: {la: {montre: false}},
        messieurs: 0,
        a: {},
        l: {},
        une: {souris: {}}
      };

      multiPath(listOfPaths, inObj).should.be.eql(outObj);
    });
  });
});
