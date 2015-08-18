/**
 * Created by jonbcampos on 8/13/14.
 */
describe('common.filters.calculateAverageByDayAndProperty', function () {

    beforeEach(module('common.filters.calculateAverageByDayAndProperty'));

    it('should return null for any nulls', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter(null, null, null)).toBeNull();
    }));

    it('should return null for any nulls', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter({}, null, null)).toBeNull();
    }));

    it('should return null for any nulls', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter({}, [], null)).toBeNull();
    }));

    it('should return null for any empties', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter({}, [], [])).toBeNull();
    }));

    it('should return null for any empties', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter({}, ['a'], [])).toBeNull();
    }));

    it('should value', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a'], ['d'])).toEqual(1);
    }));

    it('should value', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a'], ['d',
            'e', 'f'])).toEqual(2);
    }));

    it('should value', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a',
            'b'], ['d', 'e', 'f'])).toEqual(2);
    }));

    it('should value', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a',
            null], ['d', 'e', 'f'])).toEqual(2);
    }));

    it('should value', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a',
            undefined], ['d', 'e', 'f'])).toEqual(2);
    }));

    it('should value', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a',
            'b'], [null, 'e', 'f'])).toEqual(2.5);
    }));

    it('should value', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter({
            'a': {'d': 1, 'e': 2, 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a',
            'b'], [undefined, 'e', 'f'])).toEqual(2.5);
    }));

    it('should value', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter({
            'a': {'d': 1, 'e': "a", 'f': 3},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a',
            'b'], ['d', 'e', 'f'])).toEqual(2);
    }));

    it('should value', inject(function (calculateAverageByDayAndPropertyFilter) {
        expect(calculateAverageByDayAndPropertyFilter({
            'a': {'d': 1, 'e': "a", 'f': "3"},
            'b': {'d': 1, 'e': 2, 'f': 3}
        }, ['a',
            'b'], ['d', 'e', 'f'])).toEqual(2);
    }));

});