const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Function convertHandler.getNum(input)', function() {
        test('Whole number input', function(done) {
            let input = '32L';
            assert.equal(convertHandler.getNum(input),32);
            done();
        });
            
        test('Decimal number input', function(done) {
            let input = '3.2kg';
            assert.equal(convertHandler.getNum(input),3.2);
            done();
        });

        test('Fractional input', function(done) {
            let input = '32/3L';
            assert.equal(convertHandler.getNum(input),32/3);
            done();
        });

        test('Fractional input with decimal', function(done) {
            let input = '9/3.3L';
            assert.equal(convertHandler.getNum(input),9/3.3);
            done();
        });

        test('Invalid input (double fraction)', function(done) {
            let input = '32/3/3L';
            assert.equal(convertHandler.getNum(input),undefined);
            done();
        });

        test('No numerical input', function(done) {
            let input = 'L';
            assert.equal(convertHandler.getNum(input),1);
            done();
        });
    });

    suite('Function convertHandler.getUnit(input)', function() {
        test('For each valid unit input', function(done) {
            let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
            let output = ['gal','L','mi','km','lbs','kg','gal','L','mi','km','lbs','kg'];
            input.forEach(function(ele, i) {
                assert.equal(convertHandler.getUnit(ele), output[i]);
            });
            done();
        });

        test('Unknown unit input', function(done) {
            assert.equal(convertHandler.getUnit('34kilograms'),undefined);
            done();
        });
    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function() {
        test('For each valid unit input', function(done) {
            let input = ['gal','l','mi','km','lbs','kg'];
            let output = ['L','gal','km','mi','kg','lbs'];
            input.forEach(function(ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), output[i]);
            });
            done();
        });
    });

    suite('Function convertHandler.spellOutUnit(unit)', function() {
        test('For each valid unit input', function(done) {
            let input = ['gal','l','mi','km','lbs','kg'];
            let output = ['gallons','liters','miles','kilometers','pounds','kilograms'];
            input.forEach(function(ele, i) {
                assert.equal(convertHandler.spellOutUnit(ele), output[i]);
            });
            done();
        });
    });

    suite('Function convertHandler.convert(num, unit)', function() {
        test('Gal to L', function(done) {
            let input = [5, 'gal'];
            let expected = 18.9271;
            assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
            done();
        });
        
        test('L to Gal', function(done) {
            let input = [5, 'L'];
            let expected = 1.32086;
            assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
            done();
        });

        test('Mi to Km', function(done) {
            let input = [5, 'mi'];
            let expected = 8.0467;
            assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
            done();
        });

        test('Km to Mi', function(done) {
            let input = [5, 'km'];
            let expected = 3.10686;
            assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
            done();
        });

        test('Lbs to Kg', function(done) {
            let input = [5, 'lbs'];
            let expected = 2.26796;
            assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
            done();
        });
        
        test('Kg to Lbs', function(done) {
            let input = [5, 'kg'];
            let expected = 11.0231;
            assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
            done();
        });
    });
});
