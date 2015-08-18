/**
 * Created by jonbcampos on 2/10/15.
 */
describe('common.helpers.isSuccess', function () {

    beforeEach(module('common.helpers.isSuccess'));

    it('should return false', inject(function (isSuccessFilter) {
        expect(isSuccessFilter(null)).toBeFalsy();
    }));

    it('should return false', inject(function (isSuccessFilter) {
        expect(isSuccessFilter()).toBeFalsy();
    }));

    it('should return false', inject(function (isSuccessFilter) {
        expect(isSuccessFilter({})).toBeFalsy();
    }));

    it('should return false', inject(function (isSuccessFilter) {
        expect(isSuccessFilter({"fault": null})).toBeFalsy();
    }));

    it('should return false', inject(function (isSuccessFilter) {
        expect(isSuccessFilter({"data": null})).toBeFalsy();
    }));

    it('should return false', inject(function (isSuccessFilter) {
        expect(isSuccessFilter({"fault": 1})).toBeFalsy();
    }));

    it('should return false', inject(function (isSuccessFilter) {
        expect(isSuccessFilter({"data": 1})).toBeFalsy();
    }));

    it('should return false', inject(function (isSuccessFilter) {
        expect(isSuccessFilter({"result": null})).toBeFalsy();
    }));

    it('should return true', inject(function (isSuccessFilter) {
        expect(isSuccessFilter({"result": 1})).toBeTruthy();
    }));

    it('should return false', inject(function (isSuccessFilter) {
        expect(isSuccessFilter([
            {"result": null},
            {"result": 1},
            {"result": 1}
        ])).toBeFalsy();
    }));

    it('should return false', inject(function (isSuccessFilter) {
        expect(isSuccessFilter([
            {"data": null},
            {"result": 1},
            {"result": 1}
        ])).toBeFalsy();
    }));

    it('should return false', inject(function (isSuccessFilter) {
        expect(isSuccessFilter([
            {},
            {"result": 1},
            {"result": 1}
        ])).toBeFalsy();
    }));

    it('should return true', inject(function (isSuccessFilter) {
        expect(isSuccessFilter([
            {"result": 1},
            {"result": 1},
            {"result": 1}
        ])).toBeTruthy();
    }));

});