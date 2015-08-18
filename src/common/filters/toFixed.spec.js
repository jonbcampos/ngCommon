/**
 * Created by jonbcampos on 8/11/14.
 */
describe('common.filters.toFixed', function () {

    beforeEach(module('common.filters.toFixed'));

    it('should return null for null', inject(function (toFixedFilter) {
        expect(toFixedFilter(null)).toBeNull();
    }));

    it('should return empty for empty', inject(function (toFixedFilter) {
        expect(toFixedFilter('')).toEqual('');
    }));

    it('should return string for string', inject(function (toFixedFilter) {
        expect(toFixedFilter('hello')).toEqual('hello');
    }));

    it('should return mixed string for mixed string', inject(function (toFixedFilter) {
        expect(toFixedFilter('1h')).toEqual('1h');
    }));

    it('should return number lower than default', inject(function (toFixedFilter) {
        expect(toFixedFilter(1)).toEqual('1.00');
    }));

    it('should return string lower than default', inject(function (toFixedFilter) {
        expect(toFixedFilter('1')).toEqual('1.00');
    }));

    it('should return number greater than default', inject(function (toFixedFilter) {
        expect(toFixedFilter(1.0123456)).toEqual('1.01');
    }));

    it('should return string greater than default', inject(function (toFixedFilter) {
        expect(toFixedFilter('1.0123456')).toEqual('1.01');
    }));

    it('should return number greater than 4', inject(function (toFixedFilter) {
        expect(toFixedFilter(1.0123456, 4)).toEqual('1.0123');
    }));

    it('should return string greater than 4', inject(function (toFixedFilter) {
        expect(toFixedFilter('1.0123456', 4)).toEqual('1.0123');
    }));

});