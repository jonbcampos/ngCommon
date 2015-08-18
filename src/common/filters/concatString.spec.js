/**
 * Created by jonbcampos on 8/11/14.
 */
describe('common.filters.concatString', function () {

    beforeEach(module('common.filters.concatString'));

    it('should return empty for null', inject(function (concatStringFilter) {
        expect(concatStringFilter(null)).toEqual('');
    }));

    it('should return empty for empty', inject(function (concatStringFilter) {
        expect(concatStringFilter('')).toEqual('');
    }));

    it('should return string with additional option', inject(function (concatStringFilter) {
        expect(concatStringFilter("hello", '%')).toEqual('hello%');
    }));

    it('should return string with additional option, before', inject(function (concatStringFilter) {
        expect(concatStringFilter("hello", '%', true)).toEqual('%hello');
    }));

    it('should return string with no option', inject(function (concatStringFilter) {
        expect(concatStringFilter("hello", null)).toEqual('hello');
    }));

    it('should return string with no option', inject(function (concatStringFilter) {
        expect(concatStringFilter("hello", '', true)).toEqual('hello');
    }));

});