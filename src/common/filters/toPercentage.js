/**
 * Created by jonbcampos on 1/16/15.
 */
(function () {

    'use strict';

    var toPercentageFilter = angular.module('common.filters.toPercentage', []);

    /**
     * @ngdoc filter
     * @name common.filters.toPercentage
     *
     * @description
     * Enter description here.
     *
     * @param {string} input provided.
     *
     * @returns {string} filtered string.
     * @example
     * <doc:example module="demoApp">
     *     <doc:source>
     *         <script>
     *             function Ctrl($scope) {
     *             }
     *         </script>
     *         <div ng-controller="Ctrl">
     *             <table>
     *                 <tr>
     *                     <td>Input:</td>
     *                     <td><input ng-model="string"></td>
     *                 </tr>
     *             </table>
     *             <hr/>
     *             {{string | toPercentage }}
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    toPercentageFilter.filter('toPercentage', [function () {
        return function (input, toValue) {
            // null check
            if (input === undefined || input === null || input.length === 0 || isNaN(input)) {
                return null;
            }
            if (toValue == null) {
                toValue = 0;
            }
            return (Number(input) * 100).toFixed(toValue) + "%";
        };
    }]);

})();