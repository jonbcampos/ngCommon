/**
 * Created by jonbcampos on 8/28/14.
 */
(function () {

    'use strict';
    /**
     * @ngdoc directive
     * @name common.directives.validations.decimal
     * @element input
     * @restrict A
     * @scope
     *
     * @description
     * Validator for decimal type numbers.
     *
     * @example
     * <doc:example module="demoApp">
     *     <doc:source>
     *     <form name="form">
     *         <div>
     *         <input type="text" name="exampleInput" ng-model="exampleInput" decimal></input>
     *         </div>
     *         <p>
     *             <span ng-if="form.exampleInput.$invalid">Invalid</span>
     *             <span ng-if="!form.exampleInput.$invalid">Valid</span>
     *         </p>
     *         <p>
     *             Input Value: {{exampleInput}}
     *         </p>
     *     </form>
     *    </doc:source>
     * </doc:example>
     */
    var decimalDirective = angular.module('common.directives.validations.decimal', []);

    decimalDirective.directive('decimal', [function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                var DECIMAL_REGEXP = /^\-?\d*(?:\.\d{1,2})?$/;
                ctrl.$parsers.unshift(function (viewValue) {
                    if (DECIMAL_REGEXP.test(viewValue)) {
                        // it is valid
                        ctrl.$setValidity('decimal', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('decimal', false);
                        return undefined;
                    }
                });

                ctrl.$formatters.unshift(function (viewValue) {
                    if (DECIMAL_REGEXP.test(viewValue)) {
                        // it is valid
                        ctrl.$setValidity('decimal', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('decimal', false);
                        return undefined;
                    }
                });
            }
        };
    }]);

})();