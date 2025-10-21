const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test('should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('3.1mi'), 3.1);
  });

  test('should correctly read a fractional input', function() {
    assert.approximately(convertHandler.getNum('1/2km'), 0.5, 0.0001);
  });

  test('should correctly read a fractional input with a decimal', function() {
    assert.approximately(convertHandler.getNum('5.4/3lbs'), 1.8, 0.0001);
  });

  test('should correctly return an error on a double-fraction (i.e. 3/2/3)', function() {
    assert.isUndefined(convertHandler.getNum('3/2/3kg'));
  });

  test('should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('should correctly read each valid input unit', function() {
    const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    input.forEach(ele => {
      assert.equal(convertHandler.getUnit(32 + ele), ele);
    });
  });

  test('should correctly return an error for an invalid input unit', function() {
    assert.isUndefined(convertHandler.getUnit('32g'));
  });

  test('should return the correct return unit for each valid input unit', function() {
    const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    input.forEach((ele, i) => {
      assert.equal(convertHandler.getReturnUnit(ele), expected[i]);
    });
  });

  test('should correctly return the spelled-out string unit for each valid input unit', function() {
    const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    input.forEach((ele, i) => {
      assert.equal(convertHandler.spellOutUnit(ele), expected[i]);
    });
  });

  test('should correctly convert gal to L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.0001);
  });

  test('should correctly convert L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.0001);
  });

  test('should correctly convert mi to km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.0001);
  });

  test('should correctly convert km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.0001);
  });

  test('should correctly convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.0001);
  });

  test('should correctly convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.0001);
  });

});
