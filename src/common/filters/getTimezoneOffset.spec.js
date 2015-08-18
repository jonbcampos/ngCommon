/**
 * Created by jonbcampos on 4/29/15.
 */
describe('common.filters.getTimezoneOffset', function () {

    beforeEach(module('common.filters.getTimezoneOffset'));

    it('should return value', inject(function (getTimezoneOffsetFilter) {
        expect(getTimezoneOffsetFilter.getTimezone()).not.toBeNull();
    }));

    it('should return value', inject(function (getTimezoneOffsetFilter) {
        expect(getTimezoneOffsetFilter.getTimezone()).not.toBeNull();
        expect(getTimezoneOffsetFilter.getTimezone()).not.toBeNull();
    }));

});