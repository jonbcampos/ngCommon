/**
 * Created by jonbcampos on 4/17/15.
 */
describe('common.directives.validations.time', function () {

    var $scope, form;
    beforeEach(module('common.directives.validations.time'));
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;
        var element = angular.element(
            '<form name="form">' +
            '<input ng-model="model.someval" name="someval" time/>' +
            '</form>'
        );
        $scope.model = {"someval": null};
        $compile(element)($scope);
        form = $scope.form;
    }));

    describe('time', function () {

        describe('change view', function () {

            it('should fail with letter', function () {
                form.someval.$setViewValue('a');
                $scope.$digest();
                expect($scope.model.someval).toBeUndefined();
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should pass with numbers', function () {
                form.someval.$setViewValue('03:04');
                $scope.$digest();
                expect($scope.model.someval).toBe('03:04');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with numbers', function () {
                form.someval.$setViewValue('3:04');
                $scope.$digest();
                expect($scope.model.someval).toBe('3:04');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with numbers', function () {
                form.someval.$setViewValue('03:4');
                $scope.$digest();
                expect($scope.model.someval).toBe('03:4');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should fail with bad numbers', function () {
                form.someval.$setViewValue('33:04');
                $scope.$digest();
                expect($scope.model.someval).toBeUndefined();
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should fail with bad numbers', function () {
                form.someval.$setViewValue('3:64');
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
                $scope.model.someval = "03:04";
                $scope.$digest();
                expect($scope.model.someval).toBe('03:04');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with numbers', function () {
                $scope.model.someval = "3:04";
                $scope.$digest();
                expect($scope.model.someval).toBe('3:04');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with numbers', function () {
                $scope.model.someval = "03:4";
                $scope.$digest();
                expect($scope.model.someval).toBe('03:4');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should fail with bad numbers', function () {
                $scope.model.someval = "33:04";
                $scope.$digest();
                expect($scope.model.someval).toBe('33:04');
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should fail with bad numbers', function () {
                $scope.model.someval = "03:64";
                $scope.$digest();
                expect($scope.model.someval).toBe('03:64');
                expect(form.someval.$valid).toBeFalsy();
            });

        });

    });

});