/**
 * Created by jonbcampos on 9/12/14.
 */
describe('app.sections.modals.error', function () {

    beforeEach(module('app.sections.modals.error'));

    describe('errorCtrl', function () {
        var $scope, $location, ctrl, $rs, $modalInstance, data, WindowService;

        beforeEach(inject(function ($rootScope, _$location_, $controller, _WindowService_) {
            $location = _$location_;
            $scope = $rootScope.$new();
            $rs = $rootScope;
            WindowService = _WindowService_;
            $modalInstance = { // Create a mock object using spies
                close: jasmine.createSpy('modalInstance.close'),
                dismiss: jasmine.createSpy('modalInstance.dismiss'),
                result: {
                    then: jasmine.createSpy('modalInstance.result.then')
                }
            };
            data = {
                title: "hi mom!",
                message: "bleech"
            };
            ctrl = $controller('errorCtrl', {
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
        }));

        describe('accept', function () {

            it('should close modal', function () {
                $scope.accept();
                expect($modalInstance.close).toHaveBeenCalledWith(data);
            });

        });

        describe('onHelpLinkClick', function () {

            it('should go to relative link', function () {
                spyOn(WindowService, 'goToRelativeUrl');
                $scope.onHelpLinkClick();
                expect(WindowService.goToRelativeUrl).toHaveBeenCalledWith('/wps/myportal/ph/hdexpress');
            });

        });

    });

});