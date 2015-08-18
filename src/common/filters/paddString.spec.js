/**
 * Created by jonbcampos on 2/18/14.
 */
describe('common.filters.paddString', function () {

    beforeEach(module('common.filters.paddString'));

    it('should return empty string for null input, and 0 length', inject(function (paddStringFilter) {
        expect(paddStringFilter(null, null, 0)).toEqual('');
    }));

    it('should return string for string input, and 0 length', inject(function (paddStringFilter) {
        expect(paddStringFilter('string', null, 0)).toEqual('string');
    }));

    it('should return value000 for value input, and 8 length, and zeros', inject(function (paddStringFilter) {
        expect(paddStringFilter('value', 0, 8)).toEqual('value000');
    }));

    it('should return value/s/s/s for value input, and 8 length, and zeros', inject(function (paddStringFilter) {
        expect(paddStringFilter('value', null, 8)).toEqual('value   ');
    }));

    it('should return hello for hell input, and 5 length, and zeros', inject(function (paddStringFilter) {
        expect(paddStringFilter('hell', 'o', 5)).toEqual('hello');
    }));

    it('should return ohell for hell input, and 5 length, and os, and front', inject(function (paddStringFilter) {
        expect(paddStringFilter('hell', 'o', 5, true)).toEqual('ohell');
    }));

    it('should return 01 for a 1, length 2, padd with a 0', inject(function (paddStringFilter) {
        expect(paddStringFilter(1, '0', 2, true)).toEqual('01');
    }));

    it('should return 01 for a 1, length 2, padd with a 0', inject(function (paddStringFilter) {
        expect(paddStringFilter(1, 0, 2, true)).toEqual('01');
    }));

});