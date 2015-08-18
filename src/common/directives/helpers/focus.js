/* istanbul ignore next */
/**
 * Created by jonbcampos on 12/16/14.
 */
(function () {

    'use strict';
    /**
     * @ngdoc directive
     * @name common.directives.helpers.focus
     * @restrict A
     * @scope
     *
     * @description
     * autofocuses an element.
     *
     * @example
     * <doc:example module="demoApp">
     *     <doc:source>
     *
     *    </doc:source>
     * </doc:example>
     */
    var focusDirective = angular.module('common.directives.helpers.focus', []);

    focusDirective.directive('focus', ['$timeout', function ($timeout) {
        return {
            restrict: "A",
            scope: {
                focus: "@"
            },
            link: function (scope, element, attributes, ctrl) {

                var doFocus = function () {
                    $timeout(function () {
                        element[0].focus();
                    });
                };

                if (scope.focus !== null) {
                    if (scope.focus !== 'false') {
                        doFocus();
                    }
                    // focus if attribute value changes to true
                    scope.$watch('focus', function (value) {
                        if (value === 'true') {
                            doFocus();
                        }
                    });
                } else {
                    // if attribute value is not provided, just focus
                    doFocus();
                }

            }
        };
    }]);

})();