/**
 * Created by jonbcampos on 1/16/15.
 */
describe('common.filters.toPercentage', function () {

    beforeEach(module('common.filters.toPercentage'));

    it('should return null for null', inject(function (toPercentageFilter) {
        expect(toPercentageFilter(null)).toBeNull();
    }));

    it('should return null for undefined', inject(function (toPercentageFilter) {
        expect(toPercentageFilter()).toBeNull();
    }));

    it('should return null for empty', inject(function (toPercentageFilter) {
        expect(toPercentageFilter("")).toBeNull();
    }));

    it('should return value', inject(function (toPercentageFilter) {
        expect(toPercentageFilter("0.14")).toBe("14%");
    }));

    it('should return value', inject(function (toPercentageFilter) {
        expect(toPercentageFilter(0.14)).toBe("14%");
    }));

    it('should return value', inject(function (toPercentageFilter) {
        expect(toPercentageFilter("0.14", 2)).toBe("14.00%");
    }));

    it('should return value', inject(function (toPercentageFilter) {
        expect(toPercentageFilter(0.14, 2)).toBe("14.00%");
    }));

    it('should return value', inject(function (toPercentageFilter) {
        expect(toPercentageFilter("0.1412", 2)).toBe("14.12%");
    }));

    it('should return value', inject(function (toPercentageFilter) {
        expect(toPercentageFilter(0.1412, 2)).toBe("14.12%");
    }));

    it('should return value', inject(function (toPercentageFilter) {
        expect(toPercentageFilter("0.1412")).toBe("14%");
    }));

    it('should return value', inject(function (toPercentageFilter) {
        expect(toPercentageFilter(0.1412)).toBe("14%");
    }));

    it('should return value', inject(function (toPercentageFilter) {
        expect(toPercentageFilter("121")).toBe("12100%");
    }));

    it('should return value', inject(function (toPercentageFilter) {
        expect(toPercentageFilter(121)).toBe("12100%");
    }));

    it('should return value', inject(function (toPercentageFilter) {
        expect(toPercentageFilter("1")).toBe("100%");
    }));

    it('should return value', inject(function (toPercentageFilter) {
        expect(toPercentageFilter(1)).toBe("100%");
    }));

});