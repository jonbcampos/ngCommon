/**
 * Created by jonbcampos on 8/13/14.
 */
describe('common.filters.calculateTotalsByDayAndProperty', function () {

    beforeEach(module('common.filters.calculateTotalsByDayAndProperty'));

    it('should return null for any nulls', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter(null, null, null)).toBeNull();
    }));

    it('should return null for any nulls', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({}, null, null)).toBeNull();
    }));

    it('should return null for any nulls', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({}, [], null)).toBeNull();
    }));

    it('should return null for any empties', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({}, [], [])).toBeNull();
    }));

    it('should return null for any empties', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({}, ['a'])).toBe(0);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a'], ['d'])).toEqual(1);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a'], ['d',
            'e', 'f'])).toEqual(6);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a',
            'b'], ['d', 'e', 'f'])).toEqual(12);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a',
            null], ['d', 'e', 'f'])).toEqual(6);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a',
            undefined], ['d', 'e', 'f'])).toEqual(6);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({'a': {'d': 1, 'e': 2, 'f': 3}, 'b': {'d': 1, 'f': 3}}, ['a',
            'b'], ['d', 'e', 'f'])).toEqual(10);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a',
            'b'], [null, 'e', 'f'])).toEqual(10);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a',
            'b'], [undefined, 'e', 'f'])).toEqual(10);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a',
            'b'], ['d', 'e', 'f'])).toEqual(10);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a', null], ['d', 'e', 'f'])).toEqual(4);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        var days = ["a"];
        days.push();
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, days, ['d', 'e', 'f'])).toEqual(4);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        var days = ["a"], properties = ['d', 'e', 'f'];
        days.push();
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, days, properties)).toEqual(4);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        var days = ["a"], properties = null;
        days.push();
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, days, properties)).toEqual(0);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        var days = ["a"], properties = [];
        days.push();
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, days, properties)).toEqual(0);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        var days = ["a"];
        days.push();
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': {'d': 1, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, days)).toEqual(0);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        var days = ["a"];
        days.push();
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': 1,
            'b': 2
        }, days)).toEqual(1);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        var days = ["a"];
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': 1,
            'b': 2
        }, days)).toEqual(1);
    }));

    it('should value', inject(function (calculateTotalsByDayAndPropertyFilter) {
        var days = ["a", null];
        expect(calculateTotalsByDayAndPropertyFilter({
            'a': 1,
            'b': 2
        }, days)).toEqual(1);
    }));

});