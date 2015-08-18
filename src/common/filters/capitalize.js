/**
 * Created by jonbcampos on 8/8/14.
 */
(function () {

    'use strict';

    var common = angular.module('common.filters.capitalize', []);

    /**
     * @ngdoc filter
     * @name common.filters.capitalize
     *
     * @description
     * Capitalizes the first letter of the string.
     *
     * @param {string} input provided.
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
    common.filter('capitalize', function () {
        return function (input) {
            if (input === undefined || input === null) {
                input = '';
            }
            input = input.toLowerCase();
            return input.substring(0, 1).toUpperCase() + input.substring(1);
        };
    });

})();