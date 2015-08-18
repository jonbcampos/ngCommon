/**
 * Created by jonbcampos on 4/17/15.
 */
describe('common.directives.validations.integer', function () {

    var $scope, form;
    beforeEach(module('common.directives.validations.integer'));
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;
        var element = angular.element(
            '<form name="form">' +
            '<input ng-model="model.someval" name="someval" integer/>' +
            '</form>'
        );
        $scope.model = {"someval": null};
        $compile(element)($scope);
        form = $scope.form;
    }));

    describe('integer', function () {

        describe('change view', function () {

            it('should fail with letter', function () {
                form.someval.$setViewValue('a');
                $scope.$digest();
                expect($scope.model.someval).toBeUndefined();
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should pass with numbers', function () {
                form.someval.$setViewValue('1');
                $scope.$digest();
                expect($scope.model.someval).toBe('1');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should fail with decimals', function () {
                form.someval.$setViewValue('1.1');
                $scope.$digest();
                expect($scope.model.someval).toBeUndefined();
                expect(form.someval.$valid).toBeFalsy();
            });

        });

        describe('change model', function () {

            it('should fail with letter', function () {
                $scope.model.someval = "a";
                $scope.$digest();
                expect($scope.model.someval).toBe("a");
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should pass with numbers', function () {
                $scope.model.someval = "1";
                $scope.$digest();
                expect($scope.model.someval).toBe('1');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should fail with decimals', function () {
                $scope.model.someval = "1.1";
                $scope.$digest();
                expect($scope.model.someval).toBe('1.1');
                expect(form.someval.$valid).toBeFalsy();
            });

        });

    });

});