/**
 * Created by jonbcampos on 1/15/15.
 */
describe('common.filters.sumCollection', function () {

    beforeEach(module('common.filters.sumCollection'));

    it('should return null for null', inject(function (sumCollectionFilter) {
        expect(sumCollectionFilter(null)).toBeNull();
    }));

    it('should return null for undefined', inject(function (sumCollectionFilter) {
        expect(sumCollectionFilter()).toBeNull();
    }));

    it('should return null for empty', inject(function (sumCollectionFilter) {
        expect(sumCollectionFilter("")).toBeNull();
    }));

    it('should return value', inject(function (sumCollectionFilter) {
        var collection = [
            {"a": 1},
            {"a": 1},
            {"a": 1},
            {"a": 1},
            {"a": 1}
        ];
        expect(sumCollectionFilter(collection, "a")).toBe(5);
    }));

    it('should return value', inject(function (sumCollectionFilter) {
        var collection = [
            {"a": "1"},
            {"a": "1"},
            {"a": "1"},
            {"a": "1"},
            {"a": "1"}
        ];
        expect(sumCollectionFilter(collection, "a")).toBe(5);
    }));

    it('should return value', inject(function (sumCollectionFilter) {
        var collection = [
            {"a": 1},
            {"a": 1},
            {"a": 1},
            {"a": 1},
            {"b": 1}
        ];
        expect(sumCollectionFilter(collection, "a")).toBe(4);
    }));

    it('should return value', inject(function (sumCollectionFilter) {
        var collection = [
            {"a": 1},
            {"a": 1},
            {"a": 1},
            null,
            {"b": 1}
        ];
        expect(sumCollectionFilter(collection, "a")).toBe(3);
    }));

    it('should return value', inject(function (sumCollectionFilter) {
        var collection = [
            {"a": 1},
            {"a": 1},
            undefined,
            null,
            {"b": 1}
        ];
        expect(sumCollectionFilter(collection, "a")).toBe(2);
    }));

});