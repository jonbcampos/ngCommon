/**
 * Created by jonbcampos on 4/17/15.
 */
describe('common.directives.validations.date', function () {

    var $scope, form;
    beforeEach(module('common.directives.validations.date'));
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;
        var element = angular.element(
            '<form name="form">' +
            '<input ng-model="model.someval" name="someval" date/>' +
            '</form>'
        );
        $scope.model = {"someval": null};
        $compile(element)($scope);
        form = $scope.form;
    }));

    describe('date', function () {

        describe('change view', function () {

            it('should fail with letter', function () {
                form.someval.$setViewValue('a');
                $scope.$digest();
                expect($scope.model.someval).toBeUndefined();
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should pass with numbers', function () {
                form.someval.$setViewValue('2015-03-04');
                $scope.$digest();
                expect($scope.model.someval).toBe('2015-03-04');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with numbers', function () {
                form.someval.$setViewValue('2015-3-04');
                $scope.$digest();
                expect($scope.model.someval).toBe('2015-3-04');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with numbers', function () {
                form.someval.$setViewValue('2015-03-4');
                $scope.$digest();
                expect($scope.model.someval).toBe('2015-03-4');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should fail with bad format', function () {
                form.someval.$setViewValue('2015-23-04');
                $scope.$digest();
                expect($scope.model.someval).toBeUndefined();
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should fail with bad format', function () {
                form.someval.$setViewValue('2015-03-44');
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
                $scope.model.someval = "2015-03-04";
                $scope.$digest();
                expect($scope.model.someval).toBe('2015-03-04');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with numbers', function () {
                $scope.model.someval = "2015-3-04";
                $scope.$digest();
                expect($scope.model.someval).toBe('2015-3-04');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with numbers', function () {
                $scope.model.someval = "2015-03-4";
                $scope.$digest();
                expect($scope.model.someval).toBe("2015-03-4");
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should fail with bad format', function () {
                $scope.model.someval = "2015-23-04";
                $scope.$digest();
                expect($scope.model.someval).toBe("2015-23-04");
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should fail with bad format', function () {
                $scope.model.someval = "2015-3-44";
                $scope.$digest();
                expect($scope.model.someval).toBe("2015-3-44");
                expect(form.someval.$valid).toBeFalsy();
            });

        });

    });

});