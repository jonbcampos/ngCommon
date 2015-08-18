/**
 * Created by jonbcampos on 2/10/15.
 */
describe('common.helpers.createError', function () {

    beforeEach(module('common.helpers.createError'));

    it('should return null for null', inject(function (createErrorFilter) {
        expect(createErrorFilter(null)).toBeNull();
    }));

    it('should return null for undefined', inject(function (createErrorFilter) {
        expect(createErrorFilter()).toBeNull();
    }));

    it('should create the send data', inject(function (createErrorFilter) {
        var retryFunc = "a",
            revertFunc = "b",
            data = createErrorFilter({"status": 500, "data": "huh"}, "hi", retryFunc, revertFunc);
        expect(data.title).toBe("hi");
        expect(data.message).toBe("huh");
        expect(data.status).toBe(500);
        expect(data.type).toBe('danger');
        expect(data.showAsModal).toBeTruthy();
        expect(data.showDetails).toBeFalsy();
        expect(data.timeout).toBe(5000);
        expect(data.revertFunc).toBe(revertFunc);
        expect(data.retryFunc).toBe(retryFunc);
    }));

    it('should create the send data', inject(function (createErrorFilter) {
        var retryFunc = "a",
            revertFunc = "b",
            data = createErrorFilter({"status": 500, "data": "huh"}, "hi", retryFunc, revertFunc, "c", "d");
        expect(data.title).toBe("hi");
        expect(data.message).toBe("huh");
        expect(data.status).toBe(500);
        expect(data.type).toBe('danger');
        expect(data.showAsModal).toBeTruthy();
        expect(data.showDetails).toBeFalsy();
        expect(data.timeout).toBe(5000);
        expect(data.revertFunc).toBe(revertFunc);
        expect(data.retryFunc).toBe(retryFunc);
        expect(data.retryFuncArgs).toBe("c");
        expect(data.revertFuncArgs).toBe("d");
    }));

    it('should create the send data', inject(function (createErrorFilter) {
        var data = createErrorFilter({"status": 500, "data": "huh"}, "hi");
        expect(data.title).toBe("hi");
        expect(data.message).toBe("huh");
        expect(data.status).toBe(500);
        expect(data.type).toBe('danger');
        expect(data.showAsModal).toBeTruthy();
        expect(data.showDetails).toBeFalsy();
        expect(data.timeout).toBe(5000);
        expect(data.revertFunc).toBeUndefined();
        expect(data.retryFunc).toBeUndefined();
    }));

    it('should create the send data', inject(function (createErrorFilter) {
        var data = createErrorFilter({"status": 201, "data": "huh"}, "hi");
        expect(data.title).toBe("hi");
        expect(data.message).toBe("huh");
        expect(data.status).toBe(201);
        expect(data.type).toBe('info');
        expect(data.showAsModal).toBeFalsy();
        expect(data.showDetails).toBeFalsy();
        expect(data.timeout).toBe(5000);
    }));

    it('should create the send data', inject(function (createErrorFilter) {
        var data = createErrorFilter({"status": 299, "data": "huh"}, "hi");
        expect(data.title).toBe("hi");
        expect(data.message).toBe("huh");
        expect(data.status).toBe(299);
        expect(data.type).toBe('info');
        expect(data.showAsModal).toBeFalsy();
        expect(data.showDetails).toBeFalsy();
        expect(data.timeout).toBe(5000);
    }));

    it('should create the send data', inject(function (createErrorFilter) {
        var data = createErrorFilter({"status": 300, "data": "huh"}, "hi");
        expect(data.title).toBe("hi");
        expect(data.message).toBe("huh");
        expect(data.status).toBe(300);
        expect(data.type).toBe('danger');
        expect(data.showAsModal).toBeTruthy();
        expect(data.showDetails).toBeFalsy();
        expect(data.timeout).toBe(5000);
    }));

    it('should create the send data', inject(function (createErrorFilter) {
        var data = createErrorFilter([
            {"status": 500, "data": "huh"},
            {"status": 500, "data": "what"}
        ], "hi");
        expect(data.title).toBe("hi");
        expect(data.message.replace(/\W/g, " ")).toBe("huh what ");
        expect(data.status).toBe(500);
        expect(data.type).toBe('danger');
        expect(data.showAsModal).toBeTruthy();
        expect(data.showDetails).toBeFalsy();
        expect(data.timeout).toBe(5000);
    }));

    it('should create the send data', inject(function (createErrorFilter) {
        var data = createErrorFilter([
            {"status": 500, "data": "huh"},
            {"status": 200, "data": "what"}
        ], "hi");
        expect(data.title).toBe("hi");
        expect(data.message.replace(/\W/g, " ")).toBe("huh ");
        expect(data.status).toBe(500);
        expect(data.type).toBe('danger');
        expect(data.showAsModal).toBeTruthy();
        expect(data.showDetails).toBeFalsy();
        expect(data.timeout).toBe(5000);
    }));

    it('should create the send data', inject(function (createErrorFilter) {
        var data = createErrorFilter([
            {"status": 200, "data": "huh"},
            {"status": 500, "data": "what"}
        ], "hi");
        expect(data.title).toBe("hi");
        expect(data.message.replace(/\W/g, " ")).toBe("what ");
        expect(data.status).toBe(500);
        expect(data.type).toBe('danger');
        expect(data.showAsModal).toBeTruthy();
        expect(data.showDetails).toBeFalsy();
        expect(data.timeout).toBe(5000);
    }));


});