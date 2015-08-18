/**
 * Created by jonbcampos on 1/2/15.
 */
(function () {

    'use strict';

    var createGroupedCollectionsFilter = angular.module('common.filters.createGroupedCollections', []);

    /**
     * @ngdoc filter
     * @name common.filters.createGroupedCollections
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
     *             {{string | createGroupedCollections }}
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    createGroupedCollectionsFilter.filter('createGroupedCollections', [function () {
        return function (input, typeFieldName, toArray) {
            // null check
            if (input === undefined || input === null || input.length === 0 ||
                typeFieldName === undefined || typeFieldName === null || typeFieldName.length === 0) {
                return null;
            }
            // do filter
            if (toArray === undefined || toArray === null) {
                toArray = false;
            }
            var uniqueValues = {}, item = null;
            for (var i = 0, n = input.length; i < n; i++) {
                item = input[i];
                if (!item.hasOwnProperty(typeFieldName)) {
                    continue; // skip if the field doesn't exist
                }
                // add to list if exists
                if (!uniqueValues.hasOwnProperty(item[typeFieldName])) {
                    uniqueValues[item[typeFieldName]] = [];
                }
                uniqueValues[item[typeFieldName]].push(item);
            }
            if (!toArray) {
                return uniqueValues;
            }
            // else we need to turn these into an array just because
            var outputArray = [];
            for (var key in uniqueValues) {
                item = {};
                item[typeFieldName] = key;
                item.collection = uniqueValues[key];
                outputArray.push(item);
            }
            return outputArray;
        };
    }]);

})();