/**
 * Created by jonbcampos on 4/14/15.
 */
describe('app.sections.modals.logout', function () {

    beforeEach(module('app.sections.modals.logout'));

    describe('logoutCtrl', function () {
        var $scope, $location, ctrl, $rs, $modalInstance, data, WindowService;

        beforeEach(inject(function ($rootScope, _$location_, $controller, _WindowService_) {
            $location = _$location_;
            $scope = $rootScope.$new();
            $rs = $rootScope;
            WindowService = _WindowService_;
            spyOn(WindowService, 'goToRelativeUrl');
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
            ctrl = $controller('logoutCtrl', {
                $scope: $scope,
                $rootScope: $rootScope,
                $location: $location,
                $modalInstance: $modalInstance,
                data: data
            });
        }));

        it('should register properly', inject(function () {
            expect(ctrl).not.toBeNull();
            expect($scope.title).toBe('some title');
            expect($scope.message).toBe('some message');
        }));

        describe('close', function () {

            it('should call close', function () {
                $scope.close();
                expect($modalInstance.close).toHaveBeenCalledWith(true);
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