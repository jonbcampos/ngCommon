/**
 * Created by jonbcampos on 1/15/15.
 */
(function () {

    'use strict';

    var sumCollectionFilter = angular.module('common.filters.sumCollection', []);

    /**
     * @ngdoc filter
     * @name common.filters.sumCollection
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
     *             {{string | sumCollection }}
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    sumCollectionFilter.filter('sumCollection', [function () {
        return function (input, field) {
            // null check
            if (input === undefined || input === null || input.length === 0 ||
                field === undefined || field === null || field.length === 0) {
                return null;
            }
            // do filter
            var sum = 0;
            for (var i = 0, n = input.length; i < n; i++) {
                if (input[i] !== undefined &&
                    input[i] !== null &&
                    input[i].hasOwnProperty(field) && !isNaN(input[i][field])) {
                    sum += Number(input[i][field]);
                }
            }
            return sum;
        };
    }]);

})();