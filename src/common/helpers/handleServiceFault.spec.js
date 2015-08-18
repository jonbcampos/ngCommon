/**
 * Created by jonbcampos on 6/9/15.
 */
/* istanbul ignore next */
describe('common.helpers.handleServiceFault', function () {

    beforeEach(module('common.helpers.handleServiceFault'));

    var deferred;
    beforeEach(function () {
        deferred = jasmine.createSpyObj("deferred", ["reject"]);
    });

    it('should call reject', inject(function (handleServiceFaultFilter) {
        expect(handleServiceFaultFilter("hi", "mom", null, null, deferred)).toBe("hi");
        expect(deferred.reject).toHaveBeenCalledWith({"data": "hi", "status": "mom"});
    }));

});