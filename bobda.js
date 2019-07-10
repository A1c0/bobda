const R = require('ramda');
const Bromise = require('bluebird');

const bromiseMap = R.flip(R.binary(Bromise.map));
const bromiseProps = Bromise.props;
const bromiseAll = Bromise.all;

module.exports = {bromiseProps, bromiseMap, bromiseAll};
