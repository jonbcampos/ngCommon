/**
 * Created by jonbcampos on 8/28/14.
 */
(function () {

    'use strict';
    /**
     * @ngdoc directive
     * @name common.directives.validations.bigdecimal
     * @element input
     * @restrict A
     * @scope
     *
     * @description
     * Validator for big decimal type numbers.
     *
     * @example
     * <doc:example module="demoApp">
     *     <doc:source>
     *     <form name="form">
     *         <div>
     *         <input type="text" name="exampleInput" ng-model="exampleInput" bigdecimal></input>
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
    var bigDecimalDirective = angular.module('common.directives.validations.bigdecimal', []);

    bigDecimalDirective.directive('bigdecimal', [function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                var DECIMAL_REGEXP = /^\-?\d{0,2}(?:\.\d{1,8})?$/;
                ctrl.$parsers.unshift(function (viewValue) {
                    if (DECIMAL_REGEXP.test(viewValue)) {
                        // it is valid
                        ctrl.$setValidity('bigdecimal', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('bigdecimal', false);
                        return undefined;
                    }
                });

                ctrl.$formatters.unshift(function (viewValue) {
                    if (DECIMAL_REGEXP.test(viewValue)) {
                        // it is valid
                        ctrl.$setValidity('bigdecimal', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('bigdecimal', false);
                        return undefined;
                    }
                });
            }
        };
    }]);

})();