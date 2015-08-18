/**
 * Created by jonbcampos on 9/18/14.
 */
describe('common.filters.createDateFromString', function () {

    beforeEach(module('common.filters.createDateFromString'));

    it('should return null for null', inject(function (createDateFromStringFilter) {
        expect(createDateFromStringFilter(null)).toBeNull();
    }));

    it('should return null for empty', inject(function (createDateFromStringFilter) {
        expect(createDateFromStringFilter('')).toBeNull();
    }));

    it('should not transform the string', inject(function (createDateFromStringFilter) {
        expect(createDateFromStringFilter('2014-a-17')).toBeNull();
    }));

    it('should not transform the string', inject(function (createDateFromStringFilter) {
        expect(createDateFromStringFilter('2014-43-17')).toBeNull();
    }));

    it('should not transform the string', inject(function (createDateFromStringFilter) {
        expect(createDateFromStringFilter('2014-3-47')).toBeNull();
    }));

    it('should not transform the string', inject(function (createDateFromStringFilter) {
        expect(createDateFromStringFilter('2014-3-a')).toBeNull();
    }));

    it('should not transform the string', inject(function (createDateFromStringFilter) {
        expect(createDateFromStringFilter('a-3-4')).toBeNull();
    }));

    it('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2014-03-17");
        expect(d.getFullYear()).toBe(2014);
        expect(d.getMonth()).toBe(2);
        expect(d.getDate()).toBe(17);
    }));

    it('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2014-03-19");
        expect(d.getFullYear()).toBe(2014);
        expect(d.getMonth()).toBe(2);
        expect(d.getDate()).toBe(19);
        expect(d.toString().indexOf('Mar')).toBeGreaterThan(0);
    }));

    it('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2013-03-19");
        expect(d.getFullYear()).toBe(2013);
        expect(d.getMonth()).toBe(2);
        expect(d.getDate()).toBe(19);
        expect(d.toString().indexOf('Mar')).toBeGreaterThan(0);
    }));

    it('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2013-01-19");
        expect(d.getFullYear()).toBe(2013);
        expect(d.getMonth()).toBe(0);
        expect(d.getDate()).toBe(19);
        expect(d.toString().indexOf('Jan')).toBeGreaterThan(0);
    }));

    it('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2013-12-19");
        expect(d.getFullYear()).toBe(2013);
        expect(d.getMonth()).toBe(11);
        expect(d.getDate()).toBe(19);
        expect(d.toString().indexOf('Dec')).toBeGreaterThan(0);
    }));

    // hours check
    it('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2013-12-19", "00:00:00");
        expect(d.getFullYear()).toBe(2013);
        expect(d.getMonth()).toBe(11);
        expect(d.getDate()).toBe(19);
        expect(d.getHours()).toBe(0);
        expect(d.getMinutes()).toBe(0);
        expect(d.getSeconds()).toBe(0);
    }));

    it('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2013-12-19", "01:00:00");
        expect(d.getFullYear()).toBe(2013);
        expect(d.getMonth()).toBe(11);
        expect(d.getDate()).toBe(19);
        expect(d.getHours()).toBe(1);
        expect(d.getMinutes()).toBe(0);
        expect(d.getSeconds()).toBe(0);
    }));

    it('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2013-12-19", "01:20:00");
        expect(d.getFullYear()).toBe(2013);
        expect(d.getMonth()).toBe(11);
        expect(d.getDate()).toBe(19);
        expect(d.getHours()).toBe(1);
        expect(d.getMinutes()).toBe(20);
        expect(d.getSeconds()).toBe(0);
    }));

    it('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2013-12-19", "01:20:30");
        expect(d.getFullYear()).toBe(2013);
        expect(d.getMonth()).toBe(11);
        expect(d.getDate()).toBe(19);
        expect(d.getHours()).toBe(1);
        expect(d.getMinutes()).toBe(20);
        expect(d.getSeconds()).toBe(30);
    }));

    it('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2013-12-19", "01:20");
        expect(d.getFullYear()).toBe(2013);
        expect(d.getMonth()).toBe(11);
        expect(d.getDate()).toBe(19);
        expect(d.getHours()).toBe(1);
        expect(d.getMinutes()).toBe(20);
        expect(d.getSeconds()).toBe(0);
    }));

    it('should return a date', inject(function (createDateFromStringFilter) {
        var d = new Date(2015, 2, 13);
        expect(createDateFromStringFilter(d)).toBe(d);
    }));

    xit('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2013-12-19T10:20:02.020Z");
        expect(d.getFullYear()).toBe(2013);
        expect(d.getMonth()).toBe(11);
        expect(d.getDate()).toBe(19);
        expect(d.getHours()).toBe(4);
        expect(d.getMinutes()).toBe(20);
        expect(d.getSeconds()).toBe(2);
        expect(d.getMilliseconds()).toBe(20);
    }));

    xit('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2013-12-19T10:20:02.000Z");
        expect(d.getFullYear()).toBe(2013);
        expect(d.getMonth()).toBe(11);
        expect(d.getDate()).toBe(19);
        expect(d.getHours()).toBe(4);
        expect(d.getMinutes()).toBe(20);
        expect(d.getSeconds()).toBe(2);
        expect(d.getMilliseconds()).toBe(0);
    }));

    xit('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2013-12-19T10:20:02Z");
        expect(d.getFullYear()).toBe(2013);
        expect(d.getMonth()).toBe(11);
        expect(d.getDate()).toBe(19);
        expect(d.getHours()).toBe(4);
        expect(d.getMinutes()).toBe(20);
        expect(d.getSeconds()).toBe(2);
        expect(d.getMilliseconds()).toBe(0);
    }));

    xit('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2015-08-12T14:20:08Z");
        expect(d.getFullYear()).toBe(2015);
        expect(d.getMonth()).toBe(7);
        expect(d.getDate()).toBe(12);
        expect(d.getHours()).toBe(9);
        expect(d.getMinutes()).toBe(20);
        expect(d.getSeconds()).toBe(8);
        expect(d.getMilliseconds()).toBe(0);
    }));

    xit('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2015-06-12T14:20:08Z");
        expect(d.getFullYear()).toBe(2015);
        expect(d.getMonth()).toBe(5);
        expect(d.getDate()).toBe(12);
        expect(d.getHours()).toBe(9);
        expect(d.getMinutes()).toBe(20);
        expect(d.getSeconds()).toBe(8);
        expect(d.getMilliseconds()).toBe(0);
    }));

    xit('should transform the string', inject(function (createDateFromStringFilter) {
        var d = createDateFromStringFilter("2015-01-10T06:00:00Z"),
            test = new Date(2015, 0, 10, 0);
        expect(d.getFullYear()).toBe(2015);
        expect(d.getMonth()).toBe(0);
        expect(d.getDate()).toBe(10);
        expect(d.getHours()).toBe(0);
        expect(d.getMinutes()).toBe(0);
        expect(d.getSeconds()).toBe(0);
        expect(d.getMilliseconds()).toBe(0);
        expect(d).toEqual(test);
    }));

});