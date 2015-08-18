/**
 * Created by jonbcampos on 9/2/14.
 */
describe('app.sections.section1', function () {

    beforeEach(module('app.sections.section1'));

    describe('section1Ctrl', function () {
        var $scope, $location, ctrl, $rs;

        beforeEach(inject(function ($rootScope, _$location_, $controller) {
            $location = _$location_;
            $scope = $rootScope.$new();
            $rs = $rootScope;
            ctrl = $controller('section1Ctrl', {
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