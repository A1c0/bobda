const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
const R = require('ramda');
const {bromiseAll, bromiseMap, bromiseProps} = require('../bobda');

const incrementAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(++value), 30));

const squareAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(value * value), 30));

const value = 2;

const array = [2, 3, 4, 5];

chai.should();
chai.use(deepEqualInAnyOrder);

describe('test bobda', () => {
  describe('#bromiseAll', () => {
    it('should return a promise', async () => {
      (await bromiseAll(
        R.juxt([incrementAsync, squareAsync])(value)
      )).should.be.eql([3, 4]);
    });
  });

  describe('#bromiseMap', () => {
    it('should return a promise', async () => {
      (await bromiseMap(incrementAsync)(array)).should.be.eql([3, 4, 5, 6]);
    });
  });

  describe('#bromiseProps', () => {
    it('should return a promise', async () => {
      (await bromiseProps(
        R.applySpec({val: incrementAsync})(value)
      )).should.be.eql({val: 3});
    });
  });
});
