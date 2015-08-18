/**
 * Created by jonbcampos on 4/17/15.
 */
describe('app.sections.blank', function () {

    beforeEach(module('app.sections.blank'));

    describe('blankCtrl', function () {
        var $scope, $location, ctrl, $rs;

        beforeEach(inject(function ($rootScope, _$location_, $controller) {
            $location = _$location_;
            $scope = $rootScope.$new();
            $rs = $rootScope;
            ctrl = $controller('blankCtrl', {
                $scope: $scope,
                $rootScope: $rootScope,
                $location: $location
            });
        }));

        it('should register properly', inject(function () {
            expect(ctrl).not.toBeNull();
        }));

        xdescribe('aMethod', function () {

        });

    });

});