/**
 * Created by jonbcampos on 4/17/15.
 */
describe('common.directives.validations.bigdecimal', function () {

    var $scope, form;
    beforeEach(module('common.directives.validations.bigdecimal'));
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;
        var element = angular.element(
            '<form name="form">' +
            '<input ng-model="model.someval" name="someval" bigdecimal/>' +
            '</form>'
        );
        $scope.model = {"someval": null};
        $compile(element)($scope);
        form = $scope.form;
    }));

    describe('bigdecimal', function () {

        describe('change view', function () {

            it('should fail with letter', function () {
                form.someval.$setViewValue('a');
                $scope.$digest();
                expect($scope.model.someval).toBeUndefined();
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should pass with number', function () {
                form.someval.$setViewValue('1');
                $scope.$digest();
                expect($scope.model.someval).toBe('1');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                form.someval.$setViewValue('11');
                $scope.$digest();
                expect($scope.model.someval).toBe('11');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should fail with incomplete number', function () {
                form.someval.$setViewValue('11.');
                $scope.$digest();
                expect($scope.model.someval).toBeUndefined();
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should pass with number', function () {
                form.someval.$setViewValue('11.1');
                $scope.$digest();
                expect($scope.model.someval).toBe('11.1');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                form.someval.$setViewValue('11.12');
                $scope.$digest();
                expect($scope.model.someval).toBe('11.12');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                form.someval.$setViewValue('11.123');
                $scope.$digest();
                expect($scope.model.someval).toBe('11.123');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                form.someval.$setViewValue('11.1234');
                $scope.$digest();
                expect($scope.model.someval).toBe('11.1234');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                form.someval.$setViewValue('11.12345');
                $scope.$digest();
                expect($scope.model.someval).toBe('11.12345');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                form.someval.$setViewValue('11.123456');
                $scope.$digest();
                expect($scope.model.someval).toBe('11.123456');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                form.someval.$setViewValue('11.1234567');
                $scope.$digest();
                expect($scope.model.someval).toBe('11.1234567');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                form.someval.$setViewValue('11.12345678');
                $scope.$digest();
                expect($scope.model.someval).toBe('11.12345678');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                form.someval.$setViewValue('11.123456789');
                $scope.$digest();
                expect($scope.model.someval).toBeUndefined();
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should pass with number', function () {
                form.someval.$setViewValue('-11.12345678');
                $scope.$digest();
                expect($scope.model.someval).toBe('-11.12345678');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should fail with large number', function () {
                form.someval.$setViewValue('111.12345678');
                $scope.$digest();
                expect($scope.model.someval).toBeUndefined();
                expect(form.someval.$valid).toBeFalsy();
            });

        });

        describe('change model', function () {

            it('should fail with letter', function () {
                $scope.model.someval = "a";
                $scope.$apply();
                expect($scope.model.someval).toBe("a");
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should pass with number', function () {
                $scope.model.someval = 1;
                $scope.$apply();
                expect($scope.model.someval).toBe(1);
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                $scope.model.someval = '11';
                $scope.$digest();
                expect($scope.model.someval).toBe('11');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should fail with incomplete number', function () {
                $scope.model.someval = '11.';
                $scope.$digest();
                expect($scope.model.someval).toBe('11.');
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should pass with number', function () {
                $scope.model.someval = '11.1';
                $scope.$digest();
                expect($scope.model.someval).toBe('11.1');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                $scope.model.someval = '11.12';
                $scope.$digest();
                expect($scope.model.someval).toBe('11.12');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                $scope.model.someval = '11.123';
                $scope.$digest();
                expect($scope.model.someval).toBe('11.123');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                $scope.model.someval = '11.1234';
                $scope.$digest();
                expect($scope.model.someval).toBe('11.1234');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                $scope.model.someval = '11.12345';
                $scope.$digest();
                expect($scope.model.someval).toBe('11.12345');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                $scope.model.someval = '11.123456';
                $scope.$digest();
                expect($scope.model.someval).toBe('11.123456');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                $scope.model.someval = '11.1234567';
                $scope.$digest();
                expect($scope.model.someval).toBe('11.1234567');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                $scope.model.someval = '11.12345678';
                $scope.$digest();
                expect($scope.model.someval).toBe('11.12345678');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should pass with number', function () {
                $scope.model.someval = '11.123456789';
                $scope.$digest();
                expect($scope.model.someval).toBe('11.123456789');
                expect(form.someval.$valid).toBeFalsy();
            });

            it('should pass with number', function () {
                $scope.model.someval = '-11.12345678';
                $scope.$digest();
                expect($scope.model.someval).toBe('-11.12345678');
                expect(form.someval.$valid).toBeTruthy();
            });

            it('should fail with large number', function () {
                $scope.model.someval = '111.12345678';
                $scope.$digest();
                expect($scope.model.someval).toBe('111.12345678');
                expect(form.someval.$valid).toBeFalsy();
            });

        });

    });

});