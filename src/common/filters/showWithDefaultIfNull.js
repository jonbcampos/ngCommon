/**
 * Created by jonbcampos on 8/11/14.
 */
(function () {

    'use strict';

    var common = angular.module('common.filters.showWithDefaultIfNull', []);

    /**
     * @ngdoc filter
     * @name common.filters.showWithDefaultIfNull
     *
     * @description
     * Enter filter's description here.
     *
     * @param {string} input provided.
     * @param {string} defaultValue provided.
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
     <td>Starting String:</td>
     <td><input ng-model="startString"></td>
     </tr>
     <tr>
     <td>Default String:</td>
     <td><input ng-model="defaultString"></td>
     </tr>
     <tr>
     </table>
     <hr/>
     {{startString | showWithDefaultIfNull:defaultString }}
     </div>
     </doc:source>
     </doc:example>
     *
     */
    common.filter('showWithDefaultIfNull', function () {
        return function (input, defaultValue) {
            if (input === undefined || input === null || input.length === 0 || input === -1) {
                return defaultValue;
            }
            return input.toString();
        };
    });

})();