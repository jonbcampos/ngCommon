/**
 * Created by jonbcampos on 1/30/15.
 */
describe('common.filters.parseDate', function () {

    beforeEach(module('common.filters.parseDate'));

    it('should return null for null', inject(function (parseDateFilter) {
        expect(parseDateFilter(null)).toBeNull();
    }));

    it('should return null for undefined', inject(function (parseDateFilter) {
        expect(parseDateFilter()).toBeNull();
    }));

    it('should return null for empty', inject(function (parseDateFilter) {
        expect(parseDateFilter("")).toBeNull();
    }));

    describe('central timezone', function () {

        beforeEach(inject(function (getTimezoneOffsetFilter) {
            spyOn(getTimezoneOffsetFilter, 'getTimezone').andReturn(300);
        }));

        // the following tests are timezone specific
        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T00:00:00.000 -0600", true);
            expect(d.getFullYear()).toBe(2014);
            expect(d.getMonth()).toBe(0);
            expect(d.getDate()).toBe(28);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T00:00:00.000 +0400", true);
            expect(d.getFullYear()).toBe(2014);
            expect(d.getMonth()).toBe(0);
            expect(d.getDate()).toBe(28);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T00:00:00.000 -0000", true);
            expect(d.getFullYear()).toBe(2014);
            expect(d.getMonth()).toBe(0);
            expect(d.getDate()).toBe(28);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T00:00:00.000 -0000", true);
            expect(d.getFullYear()).toBe(2014);
            expect(d.getMonth()).toBe(0);
            expect(d.getDate()).toBe(28);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T00:00:00.000 -0000", false, true);
            expect(d.getUTCFullYear()).toBe(2014);
            expect(d.getUTCMonth()).toBe(0);
            expect(d.getUTCDate()).toBe(28);
            expect(d.getUTCHours()).toBe(0);
            expect(d.getUTCMinutes()).toBe(0);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T00:00:00.000 -0600", false, true);
            expect(d.getUTCFullYear()).toBe(2014);
            expect(d.getUTCMonth()).toBe(0);
            expect(d.getUTCDate()).toBe(28);
            expect(d.getUTCHours()).toBe(6);
            expect(d.getUTCMinutes()).toBe(0);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T15:23:00.000 -0400", false, true);
            expect(d.getUTCFullYear()).toBe(2014);
            expect(d.getUTCMonth()).toBe(0);
            expect(d.getUTCDate()).toBe(28);
            expect(d.getUTCHours()).toBe(19);
            expect(d.getUTCMinutes()).toBe(23);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T15:23:00.000 -0400", false, false);
            expect(d.getFullYear()).toBe(2014);
            expect(d.getMonth()).toBe(0);
            expect(d.getDate()).toBe(28);
            expect(d.getHours()).toBe(14);
            expect(d.getMinutes()).toBe(23);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2015-05-18T23:59:59.000 -0500", true, true, null, 23, 59, 59);
            expect(d.getFullYear()).toBe(2015);
            expect(d.getMonth()).toBe(4);
            expect(d.getDate()).toBe(18);
            expect(d.getHours()).toBe(23);
            expect(d.getMinutes()).toBe(59);
            expect(d.getSeconds()).toBe(59);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-10-27T18:09:14.000 -0500", false, false);
            expect(d.getFullYear()).toBe(2014);
            expect(d.getMonth()).toBe(9);
            expect(d.getDate()).toBe(27);
            expect(d.getHours()).toBe(18);
            expect(d.getMinutes()).toBe(09);
            expect(d.getSeconds()).toBe(14);
        }));

    });

    describe('eastern timezone', function () {

        beforeEach(inject(function (getTimezoneOffsetFilter) {
            spyOn(getTimezoneOffsetFilter, 'getTimezone').andReturn(240);
        }));

        // the following tests are timezone specific
        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T00:00:00.000 -0600", true);
            expect(d.getFullYear()).toBe(2014);
            expect(d.getMonth()).toBe(0);
            expect(d.getDate()).toBe(28);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T00:00:00.000 +0400", true);
            expect(d.getFullYear()).toBe(2014);
            expect(d.getMonth()).toBe(0);
            expect(d.getDate()).toBe(28);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T00:00:00.000 -0000", true);
            expect(d.getFullYear()).toBe(2014);
            expect(d.getMonth()).toBe(0);
            expect(d.getDate()).toBe(28);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T00:00:00.000 -0000", true);
            expect(d.getFullYear()).toBe(2014);
            expect(d.getMonth()).toBe(0);
            expect(d.getDate()).toBe(28);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T00:00:00.000 -0000", false, true);
            expect(d.getUTCFullYear()).toBe(2014);
            expect(d.getUTCMonth()).toBe(0);
            expect(d.getUTCDate()).toBe(28);
            expect(d.getUTCHours()).toBe(0);
            expect(d.getUTCMinutes()).toBe(0);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T00:00:00.000 -0600", false, true);
            expect(d.getUTCFullYear()).toBe(2014);
            expect(d.getUTCMonth()).toBe(0);
            expect(d.getUTCDate()).toBe(28);
            expect(d.getUTCHours()).toBe(6);
            expect(d.getUTCMinutes()).toBe(0);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T15:23:00.000 -0400", false, true);
            expect(d.getUTCFullYear()).toBe(2014);
            expect(d.getUTCMonth()).toBe(0);
            expect(d.getUTCDate()).toBe(28);
            expect(d.getUTCHours()).toBe(19);
            expect(d.getUTCMinutes()).toBe(23);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-01-28T15:23:00.000 -0400", false, false);
            expect(d.getFullYear()).toBe(2014);
            expect(d.getMonth()).toBe(0);
            expect(d.getDate()).toBe(28);
            expect(d.getHours()).toBe(15);
            expect(d.getMinutes()).toBe(23);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2015-05-18T23:59:59.000 -0500", true, true, null, 23, 59, 59);
            expect(d.getFullYear()).toBe(2015);
            expect(d.getMonth()).toBe(4);
            expect(d.getDate()).toBe(18);
            expect(d.getHours()).toBe(23);
            expect(d.getMinutes()).toBe(59);
            expect(d.getSeconds()).toBe(59);
        }));

        it('should return value', inject(function (parseDateFilter) {
            var d = parseDateFilter("2014-10-27T18:09:14.000 -0500", false, false);
            expect(d.getFullYear()).toBe(2014);
            expect(d.getMonth()).toBe(9);
            expect(d.getDate()).toBe(27);
            expect(d.getHours()).toBe(19);
            expect(d.getMinutes()).toBe(9);
            expect(d.getSeconds()).toBe(14);
        }));

        it('should return null if bad format', inject(function (parseDateFilter) {
            expect(parseDateFilter("2014-10-27T18:09:14.a -0500", true, false)).toBeNull();
        }));

    });

});