/**
 * Created by jonbcampos on 11/21/14.
 */
describe('app.sections.notfound', function () {

    beforeEach(module('app.sections.notfound'));

    describe('notfoundCtrl', function () {
        var $scope, $location, ctrl, $rs;

        beforeEach(inject(function ($rootScope, _$location_, $controller) {
            $location = _$location_;
            $scope = $rootScope.$new();
            $rs = $rootScope;
            ctrl = $controller('notfoundCtrl', {
                $scope: $scope,
                $rootScope: $rootScope,
                $location: $location
            });
        }));

        it('should register properly', inject(function () {
            expect(ctrl).not.toBeNull();
        }));

        describe('aMethod', function () {

        });

    });

});