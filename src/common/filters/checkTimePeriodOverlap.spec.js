/**
 * Created by jonbcampos on 12/31/14.
 */
/* istanbul ignore next */
describe('common.filters.checkTimePeriodOverlap', function () {

    beforeEach(module('common.filters.checkTimePeriodOverlap'));

    it('should return false if improper setup', inject(function (checkTimePeriodOverlapFilter) {
        expect(checkTimePeriodOverlapFilter(null)).toBeFalsy();
    }));

    it('should return false if improper setup', inject(function (checkTimePeriodOverlapFilter) {
        expect(checkTimePeriodOverlapFilter(null, null)).toBeFalsy();
    }));

    it('should return false if improper setup', inject(function (checkTimePeriodOverlapFilter) {
        expect(checkTimePeriodOverlapFilter(null, null, null)).toBeFalsy();
    }));

    it('should return false if improper setup', inject(function (checkTimePeriodOverlapFilter) {
        expect(checkTimePeriodOverlapFilter(null, null, null, null)).toBeFalsy();
    }));

    it('should return false if improper setup', inject(function (checkTimePeriodOverlapFilter) {
        expect(checkTimePeriodOverlapFilter()).toBeFalsy();
    }));

    it('should return false if improper setup', inject(function (checkTimePeriodOverlapFilter) {
        var now = new Date().getTime(),
            start1 = now - 500,
            end1 = now,
            start2 = now + 500,
            end2 = now + 1000;
        expect(checkTimePeriodOverlapFilter(
            new Date(start1),
            new Date(end1),
            new Date(start2),
            "a"
        )).toBeFalsy();
    }));

    it('should return false if improper setup', inject(function (checkTimePeriodOverlapFilter) {
        var now = new Date().getTime(),
            start1 = now - 500,
            end1 = now,
            start2 = now + 500,
            end2 = now + 1000;
        expect(checkTimePeriodOverlapFilter(
            new Date(start1),
            new Date(end1),
            "a",
            new Date(end2)
        )).toBeFalsy();
    }));

    it('should return false if improper setup', inject(function (checkTimePeriodOverlapFilter) {
        var now = new Date().getTime(),
            start1 = now - 500,
            end1 = now,
            start2 = now + 500,
            end2 = now + 1000;
        expect(checkTimePeriodOverlapFilter(
            new Date(start1),
            "a",
            new Date(start2),
            new Date(end2)
        )).toBeFalsy();
    }));

    it('should return false if improper setup', inject(function (checkTimePeriodOverlapFilter) {
        var now = new Date().getTime(),
            start1 = now - 500,
            end1 = now,
            start2 = now + 500,
            end2 = now + 1000;
        expect(checkTimePeriodOverlapFilter(
            "a",
            new Date(end1),
            new Date(start2),
            new Date(end2)
        )).toBeFalsy();
    }));

    it('should return false not overlapping', inject(function (checkTimePeriodOverlapFilter) {
        var now = new Date().getTime(),
            start1 = now - 500,
            end1 = now,
            start2 = now + 500,
            end2 = now + 1000;
        expect(checkTimePeriodOverlapFilter(
            new Date(start1),
            new Date(end1),
            new Date(start2),
            new Date(end2)
        )).toBeFalsy();
    }));

    it('should return false if touching', inject(function (checkTimePeriodOverlapFilter) {
        var now = new Date().getTime(),
            start1 = now - 500,
            end1 = now,
            start2 = now,
            end2 = now + 1000;
        expect(checkTimePeriodOverlapFilter(
            new Date(start1),
            new Date(end1),
            new Date(start2),
            new Date(end2)
        )).toBeFalsy();
    }));

    it('should return true if overlapping', inject(function (checkTimePeriodOverlapFilter) {
        var now = new Date().getTime(),
            start1 = now - 500,
            end1 = now,
            start2 = now - 200,
            end2 = now + 1000;
        expect(checkTimePeriodOverlapFilter(
            new Date(start1),
            new Date(end1),
            new Date(start2),
            new Date(end2)
        )).toBeTruthy();
    }));

    it('should return true if overlapping', inject(function (checkTimePeriodOverlapFilter) {
        var now = new Date().getTime(),
            start1 = now + 500,
            end1 = now + 2000,
            start2 = now,
            end2 = now + 1000;
        expect(checkTimePeriodOverlapFilter(
            new Date(start1),
            new Date(end1),
            new Date(start2),
            new Date(end2)
        )).toBeTruthy();
    }));

    it('should return true if overlapping', inject(function (checkTimePeriodOverlapFilter) {
        var now = new Date().getTime(),
            start1 = now + 100,
            end1 = now + 900,
            start2 = now,
            end2 = now + 1000;
        expect(checkTimePeriodOverlapFilter(
            new Date(start1),
            new Date(end1),
            new Date(start2),
            new Date(end2)
        )).toBeTruthy();
    }));

    it('should return true if overlapping', inject(function (checkTimePeriodOverlapFilter) {
        var now = new Date().getTime(),
            start1 = now,
            end1 = now + 1000,
            start2 = now + 100,
            end2 = now + 900;
        expect(checkTimePeriodOverlapFilter(
            new Date(start1),
            new Date(end1),
            new Date(start2),
            new Date(end2)
        )).toBeTruthy();
    }));

    xit('should return true if overlapping', inject(function (checkTimePeriodOverlapFilter) {
        expect(checkTimePeriodOverlapFilter(
            "12/11/2014",
            "12/25/2014",
            "12/10/2014",
            "12/26/2014",
            "%m/%d/%Y"
        )).toBeTruthy();
    }));


});