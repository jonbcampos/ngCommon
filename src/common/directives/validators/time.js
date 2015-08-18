/**
 * Created by jonbcampos on 8/28/14.
 */
(function () {

    'use strict';
    /**
     * @ngdoc directive
     * @name common.directives.validations.time
     * @element input
     * @restrict A
     * @scope
     *
     * @description
     * Validator for time type.
     *
     * @example
     * <doc:example module="demoApp">
     *     <doc:source>
     *     <form name="form">
     *         <div>
     *         <input type="text" name="exampleInput" ng-model="exampleInput" time></input>
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
    var timeDirective = angular.module('common.directives.validations.time', []);

    timeDirective.directive('time', [function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                var TIME_REGEXP = /^([0-2]\d|\d):([0-5]\d|\d)(?::([0-5]\d|\d))?$/;
                ctrl.$parsers.unshift(function (viewValue) {
                    if (TIME_REGEXP.test(viewValue)) {
                        // it is valid
                        ctrl.$setValidity('time', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('time', false);
                        return undefined;
                    }
                });

                ctrl.$formatters.unshift(function (viewValue) {
                    if (TIME_REGEXP.test(viewValue)) {
                        // it is valid
                        ctrl.$setValidity('time', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('time', false);
                        return undefined;
                    }
                });
            }
        };
    }]);

})();