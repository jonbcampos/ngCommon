/**
 * Created by jonbcampos on 1/16/15.
 */
describe('common.filters.noFractionCurrency', function () {

    beforeEach(module('common.filters.noFractionCurrency'));

    it('should return null for null', inject(function (noFractionCurrencyFilter) {
        expect(noFractionCurrencyFilter(null)).toBeNull();
    }));

    it('should return null for undefined', inject(function (noFractionCurrencyFilter) {
        expect(noFractionCurrencyFilter()).toBeNull();
    }));

    it('should return null for empty', inject(function (noFractionCurrencyFilter) {
        expect(noFractionCurrencyFilter("")).toBeNull();
    }));

    it('should return value', inject(function (noFractionCurrencyFilter) {
        expect(noFractionCurrencyFilter(123)).toBe('$123');
    }));

    it('should return value', inject(function (noFractionCurrencyFilter) {
        expect(noFractionCurrencyFilter("123")).toBe('$123');
    }));

    it('should return value', inject(function (noFractionCurrencyFilter) {
        expect(noFractionCurrencyFilter(1234)).toBe('$1,234');
    }));

    it('should return value', inject(function (noFractionCurrencyFilter) {
        expect(noFractionCurrencyFilter("1234")).toBe('$1,234');
    }));

    it('should return value', inject(function (noFractionCurrencyFilter) {
        expect(noFractionCurrencyFilter("-1234")).toBe('($1,234)');
    }));

    it('should return value', inject(function (noFractionCurrencyFilter) {
        expect(noFractionCurrencyFilter(null, 0)).toBe('$0');
    }));

});