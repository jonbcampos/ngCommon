/**
 * Created by jonbcampos on 6/9/15.
 */
/* istanbul ignore next */
describe('common.helpers.handleServiceResponse', function () {

    beforeEach(module('common.helpers.handleServiceResponse'));

    var deferred;
    beforeEach(function () {
        deferred = jasmine.createSpyObj("deferred", ["reject", "resolve"]);
    });

    it('should call resolve', inject(function (handleServiceResponseFilter) {
        expect(handleServiceResponseFilter("hi", "mom", null, null, deferred)).toBe("hi");
        expect(deferred.resolve).toHaveBeenCalledWith({"result": "hi", "status": "mom"});
    }));

    it('should call reject', inject(function (handleServiceResponseFilter) {
        expect(handleServiceResponseFilter("Portal Login", 511, null, null, deferred)).toBe("Portal Login");
        expect(deferred.reject).toHaveBeenCalledWith({"data": "Portal Login", "status": 511});
    }));

    xit('should call reject', inject(function (handleServiceResponseFilter) {
        expect(handleServiceResponseFilter("Portal Login", "hi", null, null, deferred)).toBe("Portal Login");
        expect(deferred.reject).toHaveBeenCalledWith({"data": "Portal Login", "status": 511});
    }));

    xit('should call reject', inject(function (handleServiceResponseFilter) {
        expect(handleServiceResponseFilter("xPortal Login", 200, null, null, deferred)).toBe("xPortal Login");
        expect(deferred.reject).toHaveBeenCalledWith({"data": "xPortal Login", "status": 511});
    }));

    xit('should call reject', inject(function (handleServiceResponseFilter) {
        expect(handleServiceResponseFilter("Portal Loginx", "hi", null, null, deferred)).toBe("Portal Loginx");
        expect(deferred.reject).toHaveBeenCalledWith({"data": "Portal Loginx", "status": 511});
    }));

    xit('should call reject', inject(function (handleServiceResponseFilter) {
        expect(handleServiceResponseFilter("what?!", 208, null, null, deferred)).toBe("what?!");
        expect(deferred.reject).toHaveBeenCalledWith({"data": "what?!", "status": 208});
    }));

    xit('should call reject', inject(function (handleServiceResponseFilter) {
        expect(handleServiceResponseFilter("what?!", "208", null, null, deferred)).toBe("what?!");
        expect(deferred.reject).toHaveBeenCalledWith({"data": "what?!", "status": 208});
    }));

    it('should call resolve with parse func', inject(function (handleServiceResponseFilter) {
        var func = function () {
            return "new data";
        };
        expect(handleServiceResponseFilter("what?!", 200, null, null, deferred, func)).toBe("what?!");
        expect(deferred.resolve).toHaveBeenCalledWith({"result": "new data", "status": 200});
    }));


});