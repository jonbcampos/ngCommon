/**
 * Created by jonbcampos on 2/9/15.
 */
describe('app.sections.modals.retry', function () {

    beforeEach(module('app.sections.modals.retry'));

    describe('retryCtrl', function () {
        var $scope, $location, ctrl, $rs, $modalInstance, data, WindowService;

        beforeEach(inject(function (_WindowService_) {
            WindowService = _WindowService_;
            spyOn(WindowService, 'goToRelativeUrl');
        }));

        describe('no retry or revert functions', function () {

            beforeEach(inject(function ($rootScope, _$location_, $controller) {
                $location = _$location_;
                $scope = $rootScope.$new();
                $rs = $rootScope;
                $modalInstance = { // Create a mock object using spies
                    close: jasmine.createSpy('modalInstance.close'),
                    dismiss: jasmine.createSpy('modalInstance.dismiss'),
                    result: {
                        then: jasmine.createSpy('modalInstance.result.then')
                    }
                };
                data = {
                    "title": "some title",
                    "message": "some message"
                };
                ctrl = $controller('retryCtrl', {
                    $scope: $scope,
                    $rootScope: $rootScope,
                    $location: $location,
                    $modalInstance: $modalInstance,
                    data: data,
                    WindowService: WindowService
                });
            }));

            it('should register properly', inject(function () {
                expect(ctrl).not.toBeNull();
                expect($scope.revertLabel).toBe('Close');
                expect($scope.revertIcon).toBe('times');
                expect($scope.title).toBe('some title');
                expect($scope.message).toBe('some message');
            }));

            describe('retry', function () {

                it('should call close', function () {
                    $scope.retry();
                    expect($modalInstance.close).toHaveBeenCalledWith(data);
                });

            });

            describe('revert', function () {

                it('should call dismiss', function () {
                    $scope.revert();
                    expect($modalInstance.dismiss).toHaveBeenCalledWith(data);
                });

            });

            describe('onHelpLinkClick', function () {

                it('should call window service', function () {
                    $scope.onHelpLinkClick();
                    expect(WindowService.goToRelativeUrl).toHaveBeenCalledWith("/wps/myportal/ph/hdexpress");
                });

            });

        });

        describe('null retry or revert functions', function () {

            beforeEach(inject(function ($rootScope, _$location_, $controller) {
                $location = _$location_;
                $scope = $rootScope.$new();
                $rs = $rootScope;
                $modalInstance = { // Create a mock object using spies
                    close: jasmine.createSpy('modalInstance.close'),
                    dismiss: jasmine.createSpy('modalInstance.dismiss'),
                    result: {
                        then: jasmine.createSpy('modalInstance.result.then')
                    }
                };
                data = {
                    "title": "some title",
                    "message": "some message",
                    "retryFunc": null,
                    "revertFunc": null
                };
                ctrl = $controller('retryCtrl', {
                    $scope: $scope,
                    $rootScope: $rootScope,
                    $location: $location,
                    $modalInstance: $modalInstance,
                    data: data,
                    WindowService: WindowService
                });
            }));

            it('should register properly', inject(function () {
                expect(ctrl).not.toBeNull();
                expect($scope.revertLabel).toBe('Close');
                expect($scope.revertIcon).toBe('times');
                expect($scope.title).toBe('some title');
                expect($scope.message).toBe('some message');
            }));

            describe('retry', function () {

                it('should call close', function () {
                    $scope.retry();
                    expect($modalInstance.close).toHaveBeenCalledWith(data);
                });

            });

            describe('revert', function () {

                it('should call dismiss', function () {
                    $scope.revert();
                    expect($modalInstance.dismiss).toHaveBeenCalledWith(data);
                });

            });

            describe('onHelpLinkClick', function () {

                it('should call window service', function () {
                    $scope.onHelpLinkClick();
                    expect(WindowService.goToRelativeUrl).toHaveBeenCalledWith("/wps/myportal/ph/hdexpress");
                });

            });

        });

        describe('with retry or revert functions', function () {

            beforeEach(inject(function ($rootScope, _$location_, $controller) {
                $location = _$location_;
                $scope = $rootScope.$new();
                $rs = $rootScope;
                $modalInstance = { // Create a mock object using spies
                    close: jasmine.createSpy('modalInstance.close'),
                    dismiss: jasmine.createSpy('modalInstance.dismiss'),
                    result: {
                        then: jasmine.createSpy('modalInstance.result.then')
                    }
                };
                data = {
                    "title": "some title",
                    "message": "some message",
                    "retryFunc": jasmine.createSpy('retryFunc'),
                    "retryFuncArgs": [1, 2, 3],
                    "revertFunc": jasmine.createSpy('revertFunc'),
                    "revertFuncArgs": [4, 5, 6]
                };
                ctrl = $controller('retryCtrl', {
                    $scope: $scope,
                    $rootScope: $rootScope,
                    $location: $location,
                    $modalInstance: $modalInstance,
                    data: data,
                    WindowService: WindowService
                });
            }));

            it('should register properly', inject(function () {
                expect(ctrl).not.toBeNull();
                expect($scope.revertLabel).toBe('Revert');
                expect($scope.revertIcon).toBe('reply');
                expect($scope.title).toBe('some title');
                expect($scope.message).toBe('some message');
            }));

            describe('retry', function () {

                it('should call retry func and close', function () {
                    $scope.retry();
                    expect(data.retryFunc).toHaveBeenCalledWith(data.retryFuncArgs);
                    expect($modalInstance.close).toHaveBeenCalledWith(data);
                });

            });

            describe('revert', function () {

                it('should call revert func and dismiss', function () {
                    $scope.revert();
                    expect(data.revertFunc).toHaveBeenCalledWith(data.revertFuncArgs);
                    expect($modalInstance.dismiss).toHaveBeenCalledWith(data);
                });

            });

            describe('onHelpLinkClick', function () {

                it('should call window service', function () {
                    $scope.onHelpLinkClick();
                    expect(WindowService.goToRelativeUrl).toHaveBeenCalledWith("/wps/myportal/ph/hdexpress");
                });

            });

        });

    });

});