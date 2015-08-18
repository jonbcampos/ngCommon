/**
 * Created by jonbcampos on 8/19/14.
 */
describe('models.PropertiesModel', function () {

    beforeEach(module('models.PropertiesModel'));

    var mockService, mockRoot, loadPropertiesResult;
    beforeEach(module('services.PropertiesService'));

    describe('PropertiesModel', function () {

        it('should be set up properly', inject(function (PropertiesModel) {
            expect(PropertiesModel).toBeDefined();
            expect(PropertiesModel).not.toBeNull();
            expect(PropertiesModel.properties).not.toBeNull();
        }));

        describe('successful', function () {

            beforeEach(inject(function (_$q_, _$rootScope_, _PropertiesService_) {
                loadPropertiesResult = {"result": {"a": 1}};

                mockRoot = _$rootScope_;
                spyOn(mockRoot, '$emit');

                mockService = _PropertiesService_;
                var loadPropertiesDeferred = _$q_.defer();

                loadPropertiesDeferred.resolve(loadPropertiesResult);
                spyOn(mockService, 'loadProperitiesFile').andReturn(loadPropertiesDeferred.promise);
            }));

            describe('loadProperties', function () {

                it('should load the file by name', inject(function (PropertiesModel) {
                    expect(PropertiesModel.properties).not.toBeNull();
                    expect(PropertiesModel.loadProperties("hello")).not.toBeNull();
                    expect(PropertiesModel.propertiesLoading).toBeTruthy();
                    expect(mockRoot.$emit).toHaveBeenCalledWith('propertiesLoadingChanged', true);
                    expect(mockService.loadProperitiesFile.calls.length).toEqual(1);
                    expect(mockService.loadProperitiesFile.mostRecentCall.args.length).toEqual(1);
                    expect(mockService.loadProperitiesFile.mostRecentCall.args[0]).toEqual("hello");
                    mockRoot.$apply();
                    expect(PropertiesModel.propertiesLoading).toBeFalsy();
                    expect(mockRoot.$emit).toHaveBeenCalledWith('propertiesLoadingChanged', false);
                    expect(mockRoot.$emit).toHaveBeenCalledWith('propertiesChanged', PropertiesModel.properties);
                    expect(PropertiesModel.properties.hello).toEqual(loadPropertiesResult.result);
                }));

            });

        });

        describe('failure', function () {

            beforeEach(inject(function (_$q_, _$rootScope_, _PropertiesService_) {
                loadPropertiesResult = {"data": {"a": 1}};

                mockRoot = _$rootScope_;
                spyOn(mockRoot, '$emit');

                mockService = _PropertiesService_;
                var loadPropertiesDeferred = _$q_.defer();

                loadPropertiesDeferred.reject(loadPropertiesResult);
                spyOn(mockService, 'loadProperitiesFile').andReturn(loadPropertiesDeferred.promise);
            }));

            describe('loadProperties', function () {

                it('should load the file by name', inject(function (PropertiesModel) {
                    expect(PropertiesModel.properties).not.toBeNull();
                    expect(PropertiesModel.loadProperties("hello")).not.toBeNull();
                    expect(PropertiesModel.propertiesLoading).toBeTruthy();
                    expect(mockRoot.$emit).toHaveBeenCalledWith('propertiesLoadingChanged', true);
                    expect(mockService.loadProperitiesFile.calls.length).toEqual(1);
                    expect(mockService.loadProperitiesFile.mostRecentCall.args.length).toEqual(1);
                    expect(mockService.loadProperitiesFile.mostRecentCall.args[0]).toEqual("hello");
                    mockRoot.$apply();
                    expect(PropertiesModel.propertiesLoading).toBeFalsy();
                    expect(mockRoot.$emit).toHaveBeenCalledWith('propertiesLoadingChanged', false);
                    expect(mockRoot.$emit).not.toHaveBeenCalledWith('propertiesChanged');
                    expect(PropertiesModel.properties.hello).toBeNull();
                }));

            });

        });

    });
});