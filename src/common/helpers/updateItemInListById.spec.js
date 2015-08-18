/**
 * Created by jonbcampos on 8/10/15.
 */
/* istanbul ignore next */
describe('common.helpers.updateItemInListById', function () {

    beforeEach(module('common.helpers.updateItemInListById'));

    it('should return null for null', inject(function (updateItemInListByIdFilter) {
        expect(updateItemInListByIdFilter(null)).toBeNull();
    }));

    it('should return null for undefined', inject(function (updateItemInListByIdFilter) {
        expect(updateItemInListByIdFilter()).toBeNull();
    }));

    it('should return null for empty', inject(function (updateItemInListByIdFilter) {
        expect(updateItemInListByIdFilter("")).toBeNull();
    }));

    it('should return null for empty', inject(function (updateItemInListByIdFilter) {
        expect(updateItemInListByIdFilter({})).toBeNull();
    }));

    it('should return null for empty', inject(function (updateItemInListByIdFilter) {
        expect(updateItemInListByIdFilter({"id": null})).toBeNull();
    }));

    it('should return null for empty', inject(function (updateItemInListByIdFilter) {
        expect(updateItemInListByIdFilter({"id": 1}, null)).toBeNull();
    }));

    it('should return null for empty', inject(function (updateItemInListByIdFilter) {
        expect(updateItemInListByIdFilter({"id": 1}, [])).toBeNull();
    }));

    it('should return value for missing', inject(function (updateItemInListByIdFilter) {
        expect(updateItemInListByIdFilter({"id": 1}, [{}])).toEqual({"id": 1});
    }));

    it('should return value for missing', inject(function (updateItemInListByIdFilter) {
        expect(updateItemInListByIdFilter({"id": 1}, [{"id": null}])).toEqual({"id": 1});
    }));

    it('should return value for found', inject(function (updateItemInListByIdFilter) {
        expect(updateItemInListByIdFilter({"id": 1}, [{"id": 1}])).toEqual({"id": 1});
    }));

    it('should return value for found', inject(function (updateItemInListByIdFilter) {
        expect(updateItemInListByIdFilter({"id": 3}, [{"id": 1}, {"id": 2}, {"id": 3}])).toEqual({"id": 3});
    }));

    it('should return value for found', inject(function (updateItemInListByIdFilter) {
        expect(updateItemInListByIdFilter({"id": 3}, [{"id": 1}, {"idx": 2}, {"id": 3}])).toEqual({"id": 3});
    }));


});