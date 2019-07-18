const objTest = {
  propString: 'value',
  propObj: {
    propBool: false,
    a: 'gg ez'
  }
};

const objPropRenamed = {
  chapi: 'value',
  propObj: {
    propBool: false,
    a: 'gg ez'
  }
};
const objFullRenamed = {
  chapi: 'value',
  chapo: {
    patapo: false
  },
  propObj: {
    a: 'gg ez'
  }
};

module.exports = {objTest, objPropRenamed, objFullRenamed};
