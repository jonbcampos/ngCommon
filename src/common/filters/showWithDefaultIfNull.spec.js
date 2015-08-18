/**
 * Created by jonbcampos on 8/11/14.
 */
describe('common.filters.showWithDefaultIfNull', function () {

    beforeEach(module('common.filters.showWithDefaultIfNull'));

    it('should show All Open Hours for null', inject(function (showWithDefaultIfNullFilter) {
        expect(showWithDefaultIfNullFilter(null, 'All Open Hours')).toBe('All Open Hours');
    }));

    it('should show All Open Hours for null for -1', inject(function (showWithDefaultIfNullFilter) {
        expect(showWithDefaultIfNullFilter(-1, 'All Open Hours')).toBe('All Open Hours');
    }));

    it('should show 2 for 2', inject(function (showWithDefaultIfNullFilter) {
        expect(showWithDefaultIfNullFilter(2, 'All Open Hours')).toBe('2');
    }));

    it('should show hi for hi', inject(function (showWithDefaultIfNullFilter) {
        expect(showWithDefaultIfNullFilter('hi', 'All Open Hours')).toBe('hi');
    }));

});