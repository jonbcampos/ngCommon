/**
 * Created by jonbcampos on 8/11/14.
 */
describe('common.filters.capitalize', function () {

    beforeEach(module('common.filters.capitalize'));

    it('should return empty for null', inject(function (capitalizeFilter) {
        expect(capitalizeFilter()).toEqual('');
    }));

    it('should return empty for null', inject(function (capitalizeFilter) {
        expect(capitalizeFilter(null)).toEqual('');
    }));

    it('should return empty for empty', inject(function (capitalizeFilter) {
        expect(capitalizeFilter('')).toEqual('');
    }));

    it('should capitalize the first word', inject(function (capitalizeFilter) {
        expect(capitalizeFilter("hello")).toEqual('Hello');
    }));

    it('should capitalize the first word', inject(function (capitalizeFilter) {
        expect(capitalizeFilter("hello world")).toEqual('Hello world');
    }));

    it('should capitalize the first word', inject(function (capitalizeFilter) {
        expect(capitalizeFilter("HELLO")).toEqual('Hello');
    }));

    it('should capitalize the first word', inject(function (capitalizeFilter) {
        expect(capitalizeFilter("HELLO WORLD")).toEqual('Hello world');
    }));

});