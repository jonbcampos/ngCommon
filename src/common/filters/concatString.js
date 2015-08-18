/**
 * Created by jonbcampos on 8/11/14.
 */
(function () {

    'use strict';

    var common = angular.module('common.filters.concatString', []);

    /**
     * @ngdoc filter
     * @name common.filters.concatString
     *
     * @description
     * Concatinates a string with the provided string;
     * either before or after based on final parameter.
     *
     * @param {string} input provided.
     * @param {string} concat string provided.
     * @param {boolean} before or after.
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
     <tr>
     <td>Concatinate String:</td>
     <td><input ng-model="concat"></td>
     </tr>
     <tr>
     <td>Before:</td>
     <td><input type="checkbox" ng-model="before"></td>
     </tr>
     </table>
     <hr/>
     {{string | concatString:concat:before }}
     </div>
     </doc:source>
     </doc:example>
     *
     */
    common.filter('concatString', function () {
        return function (input, concat, before) {
            if (input == null || input === '') {
                return '';
            }
            if (concat == null) {
                concat = '';
            }
            return (before === true) ? concat + input : input + concat;
        };
    });

})();