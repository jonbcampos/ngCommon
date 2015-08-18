/**
 * Created by jonbcampos on 8/10/15.
 */
(function () {

    'use strict';

    var updateItemInListByIdFilter = angular.module('common.helpers.updateItemInListById', []);

    /**
     * @ngdoc filter
     * @name common.helpers.updateItemInListById
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
     *             {{string | updateItemInListById }}
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    updateItemInListByIdFilter.filter('updateItemInListById', [function () {
        return function (input, list, idField) {
            // null check
            if (input === undefined || input === null || input.length === 0 ||
                list === undefined || list === null || list.length === 0) {
                return null;
            }
            // default
            idField = idField || "id";
            // do filter
            for (var i = 0, n = list.length; i < n; i++) {
                // skip malformed elements
                if (list[i] === undefined || list[i] === null ||
                    list[i][idField] === undefined || list[i][idField] === null ||
                    input[idField] === undefined || input[idField] === null) {
                    continue;
                }
                // make comparison
                if (list[i][idField] === input[idField]) {
                    list[i] = input;
                    break;
                }
            }
            return input;
        };
    }]);

})();