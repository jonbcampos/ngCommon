/**
 * Created by jonbcampos on 8/8/14.
 */
(function () {

    'use strict';

    var common = angular.module('common.filters.toFixed', []);

    /**
     * @ngdoc filter
     * @name common.filters.toFixed
     *
     * @description
     * Capitalizes the first letter of the string.
     *
     * @param {number} input provided.
     *
     * @returns {string} filtered string.
     *
     * @example
     <doc:example module="demoApp">
     <doc:source>
     <script>
     function Ctrl($scope) {

     }
     </script>
     <div ng-controller="Ctrl">
     <table>
     <tr>
     <td>Input:</td>
     <td><input ng-model="string"></td>
     </tr>
     </table>
     <hr/>
     {{string | capitalize }}
     </div>
     </doc:source>
     </doc:example>
     *
     */
    common.filter('toFixed', function () {
        return function (input, toValue) {
            if (input === undefined || input === null || input.length === 0 || isNaN(input)) {
                return input;
            }
            if (toValue == null) {
                toValue = 2;
            }
            return Number(input).toFixed(toValue);
        };
    });

})();