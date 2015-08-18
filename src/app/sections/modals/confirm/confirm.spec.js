/**
 * Created by jonbcampos on 11/5/14.
 */
describe('app.sections.modals.confirm', function () {

    beforeEach(module('app.sections.modals.confirm'));

    describe('confirmCtrl', function () {
        var $scope, $location, ctrl, $rs, $modalInstance;

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
            ctrl = $controller('confirmCtrl', {
                $scope: $scope,
                $rootScope: $rootScope,
                $location: $location,
                $modalInstance: $modalInstance,
                confirmText: "hello world"
            });
        }));

        it('should register properly', inject(function () {
            expect(ctrl).not.toBeNull();
        }));

        describe('accept', function () {

            it('should respond with true', inject(function () {
                $scope.accept();
                expect($modalInstance.close).toHaveBeenCalledWith(true);
            }));

        });

        describe('cancel', function () {

            it('should respond with false', inject(function () {
                $scope.cancel();
                expect($modalInstance.dismiss).toHaveBeenCalledWith(false);
            }));

        });

    });

});