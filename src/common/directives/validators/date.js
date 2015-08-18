/**
 * Created by jonbcampos on 8/28/14.
 */
(function () {

    'use strict';
    /**
     * @ngdoc directive
     * @name common.directives.validations.date
     * @element input
     * @restrict A
     * @scope
     *
     * @description
     * Validator for date type.
     *
     * @example
     * <doc:example module="demoApp">
     *     <doc:source>
     *     <form name="form">
     *         <div>
     *         <input type="text" name="exampleInput" ng-model="exampleInput" date></input>
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
    var dateDirective = angular.module('common.directives.validations.date', []);

    dateDirective.directive('date', [function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                var DATE_REGEXP = /^\d{4}\-([0,1]\d|[1-9])\-([0-3]\d|[1-9])$/;
                ctrl.$parsers.unshift(function (viewValue) {
                    if (DATE_REGEXP.test(viewValue)) {
                        // it is valid
                        ctrl.$setValidity('date', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('date', false);
                        return undefined;
                    }
                });

                ctrl.$formatters.unshift(function (viewValue) {
                    if (DATE_REGEXP.test(viewValue)) {
                        // it is valid
                        ctrl.$setValidity('date', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('date', false);
                        return undefined;
                    }
                });
            }
        };
    }]);

})();