/* istanbul ignore next */
/**
 * Created by jonbcampos on 4/17/15.
 */
describe('services.PropertiesService', function () {

    beforeEach(module('services.PropertiesService'));

    describe('PropertiesService', function () {

        it('should be set up properly', inject(function (PropertiesService) {
            expect(PropertiesService).toBeDefined();
            expect(PropertiesService).not.toBeNull();
        }));

        describe('loadProperitiesFile', function () {

            var result, $httpBackend;
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
            }));

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            describe('success', function () {

                beforeEach(function () {
                    result = [];
                    $httpBackend.when('GET', './assets/data/hi.json')
                        .respond(200, result);
                    $httpBackend.expectGET('./assets/data/hi.json');
                });

                it('should respond', inject(function (PropertiesService) {
                    var promise = PropertiesService.loadProperitiesFile('hi');
                    expect(promise).not.toBeNull();
                    promise.then(function (value) {
                        expect(value.result).not.toBeNull();
                        expect(value.status).toBe(200);
                    });
                    $httpBackend.flush();
                }));
            });

            describe('fault', function () {

                beforeEach(function () {
                    result = "Error";
                    $httpBackend.when('GET', './assets/data/hi.json')
                        .respond(500, result);
                    $httpBackend.expectGET('./assets/data/hi.json');
                });

                it('should respond', inject(function (PropertiesService) {
                    var promise = PropertiesService.loadProperitiesFile('hi');
                    expect(promise).not.toBeNull();
                    promise.then(function (value) {
                        expect(value.result).toBe("Error");
                        expect(value.status).toBe(500);
                    });
                    $httpBackend.flush();
                }));

            });

        });

    });
});