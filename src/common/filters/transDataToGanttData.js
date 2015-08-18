/**
 * Created by jonbcampos on 1/2/15.
 */
(function () {

    'use strict';

    var transDataToGanttDataFilter = angular.module('common.filters.transDataToGanttData', [
        'common.filters.checkTimePeriodOverlap'
    ]);

    /**
     * @ngdoc filter
     * @name common.filters.transDataToGanttData
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
     *             {{string | transDataToGanttData }}
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    transDataToGanttDataFilter.filter('transDataToGanttData', ['checkTimePeriodOverlapFilter',
        function (checkTimePeriodOverlapFilter) {

            var determineOverlappingValues = function (key, values, startDateFieldName, endDateFieldName, outputFieldName, dateTimeFormat) {
                /* istanbul ignore next */
                if (values === undefined || values === null || values.length === 0) {
                    return null; // don't include bad data
                }
                // if only one then we don't have to do any comparisons
                if (values.length === 1) {
                    values[0][outputFieldName] = key;
                    return values;
                }
                // finally we have to do some loops and figure out
                // and figure out how deeply we need to stack data
                var lists = [];
                // initially put everything in the top level list
                lists[0] = values;
                createLevels(key, lists, startDateFieldName, endDateFieldName, outputFieldName, 0, lists[0].length, dateTimeFormat);
                return flattedLists(lists);
            };

            var createLevels = function (key, lists, startDateFieldName, endDateFieldName, outputFieldName, index, length, dateTimeFormat) {
                var values = lists[index], goToNextLevel = false;
                length--; // get the last one in the list
                var outerValue = values[length];
                // set the outervalue to be on this level
                outerValue[outputFieldName] = key + " " + (index + 1);
                // go through other items and see if
                // they fit on this level
                for (var i = length - 1, n = -1; i > n; i--) { // offset by the one pulled out
                    var innerValue = values[i];
                    // check if the values overlap
                    var doesOverlap = checkTimePeriodOverlapFilter(
                        outerValue[startDateFieldName],
                        outerValue[endDateFieldName],
                        innerValue[startDateFieldName],
                        innerValue[endDateFieldName],
                        dateTimeFormat);
                    if (doesOverlap) {
                        // if overlaps then we move the item
                        // to the next level to try later
                        if (lists[index + 1] === undefined || lists[index + 1] === null) {
                            lists[index + 1] = [];
                        }
                        goToNextLevel = true;
                        length--;
                        lists[index + 1].push(innerValue); // add to next level
                        values.splice(i, 1); // remove from current level
                    } else {
                        // if does not overlap then we can set
                        // the innervalue's info to this level
                        // and then restart the searching
                        innerValue[outputFieldName] = key + " " + (index + 1);
                        createLevels(key, lists, startDateFieldName, endDateFieldName, outputFieldName, index, length, dateTimeFormat);
                        break;
                    }
                }
                // are there more levels? Then we need
                // to deal with them
                if (goToNextLevel) {
                    createLevels(key, lists, startDateFieldName, endDateFieldName, outputFieldName, index + 1, lists[index + 1].length, dateTimeFormat);
                }
            };

            var flattedLists = function (lists) {
                var values = [];
                for (var i = 0, n = lists.length; i < n; i++) {
                    values = values.concat(lists[i]);
                }
                return values;
            };

            return function (input, typeFieldName, startDateFieldName, endDateFieldName, outputFieldName, groupedCollection, dateTimeFormat) {
                // null check
                if (input === undefined || input === null || input.length === 0 ||
                    typeFieldName === undefined || typeFieldName === null || typeFieldName.length === 0 ||
                    startDateFieldName === undefined || startDateFieldName === null || startDateFieldName.length === 0 ||
                    endDateFieldName === undefined || endDateFieldName === null || endDateFieldName.length === 0 ||
                    outputFieldName === undefined || outputFieldName === null || outputFieldName.length === 0 ||
                    groupedCollection === undefined || groupedCollection === null) {
                    return null;
                }
                // null check
                dateTimeFormat = dateTimeFormat || null;
                // prepare sort func
                var sortByStartDay = function (a, b) {
                    return a[startDateFieldName] > b[startDateFieldName] ? 1 :
                           a[startDateFieldName] < b[startDateFieldName] ? -1 : 0;
                };
                // do data transformation
                var values = [];
                for (var key in groupedCollection) {
                    // sort grouped collection
                    // sort order to help gantt info
                    groupedCollection[key].sort(sortByStartDay);
                    // create results
                    var results = determineOverlappingValues(key, groupedCollection[key],
                        startDateFieldName, endDateFieldName, outputFieldName, dateTimeFormat);
                    if (results !== null && results.length > 0) {
                        values = values.concat(results);
                    }
                }
                // end
                return values;
            };
        }]);

})();