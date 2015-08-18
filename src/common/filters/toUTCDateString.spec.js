/**
 * Created by jonbcampos on 4/29/15.
 */
describe('common.filters.toUTCDateString', function () {

    beforeEach(module('common.filters.toUTCDateString'));

    it('should return null for null', inject(function (toUTCDateStringFilter) {
        expect(toUTCDateStringFilter(null)).toBeNull();
    }));

    it('should return null for undefined', inject(function (toUTCDateStringFilter) {
        expect(toUTCDateStringFilter()).toBeNull();
    }));

    it('should return null for empty', inject(function (toUTCDateStringFilter) {
        expect(toUTCDateStringFilter("")).toBeNull();
    }));

    it('should return null for empty', inject(function (toUTCDateStringFilter) {
        expect(toUTCDateStringFilter("a")).toBeNull();
    }));

    it('should return null for empty', inject(function (toUTCDateStringFilter) {
        expect(toUTCDateStringFilter(1)).toBeNull();
    }));

    it('should return value', inject(function (toUTCDateStringFilter) {
        var d = new Date(Date.UTC(2015, 9, 10, 15, 12, 13));
        expect(toUTCDateStringFilter(d)).toBe("Sat, Oct 10, 2015");
    }));

    it('should return value', inject(function (toUTCDateStringFilter) {
        var d = new Date(Date.UTC(2015, 9, 18, 15, 12, 13));
        expect(toUTCDateStringFilter(d)).toBe("Sun, Oct 18, 2015");
    }));

    it('should return value', inject(function (toUTCDateStringFilter) {
        var d = new Date(Date.UTC(2015, 9, 18, 0, 0, 0));
        expect(toUTCDateStringFilter(d)).toBe("Sun, Oct 18, 2015");
    }));

});