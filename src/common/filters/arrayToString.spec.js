/**
 * Created by jonbcampos on 11/12/14.
 */
describe('common.filters.arrayToString', function () {

    beforeEach(module('common.filters.arrayToString'));

    it('should return empty string for null', inject(function (arrayToStringFilter) {
        expect(arrayToStringFilter(null)).toEqual('');
    }));

    it('should return empty string for empty array', inject(function (arrayToStringFilter) {
        expect(arrayToStringFilter([])).toEqual('');
    }));

    it('should return abc string for [a,b,c] array', inject(function (arrayToStringFilter) {
        expect(arrayToStringFilter(['a', 'b', 'c'])).toEqual('abc');
    }));

    it('should return a b c string for [a,b,c] array with space separator', inject(function (arrayToStringFilter) {
        expect(arrayToStringFilter(['a', 'b', 'c'], ' ')).toEqual('a b c');
    }));

    it('should return a, b, c string for [a,b,c] array with space/comma separator', inject(function (arrayToStringFilter) {
        expect(arrayToStringFilter(['a', 'b', 'c'], ', ')).toEqual('a, b, c');
    }));

    it('should return a, b, c string for [a,b,c] array with space/comma separator', inject(function (arrayToStringFilter) {
        expect(arrayToStringFilter(['a', 'b', null, 'c'], ', ')).toEqual('a, b, c');
    }));
});