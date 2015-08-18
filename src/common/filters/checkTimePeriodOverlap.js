/**
 * Created by jonbcampos on 12/31/14.
 */
(function () {

    'use strict';

    var checkTimePeriodOverlapFilter = angular.module('common.filters.checkTimePeriodOverlap', [
        'common.filters.parseDate'
    ]);

    /**
     * @ngdoc filter
     * @name common.filters.checkTimePeriodOverlap
     *
     * @description
     * Checks if two date ranges overlap.
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
     *                     <td>Start Date 1:</td>
     *                     <td><input ng-model="startDate1" type="date"></td>
     *                 </tr>
     *                 <tr>
     *                     <td>End Date 1:</td>
     *                     <td><input ng-model="endDate1" type="date"></td>
     *                 </tr>
     *                 <tr>
     *                     <td>Start Date 2:</td>
     *                     <td><input ng-model="startDate2" type="date"></td>
     *                 </tr>
     *                 <tr>
     *                     <td>End Date 2:</td>
     *                     <td><input ng-model="endDate2" type="date"></td>
     *                 </tr>
     *             </table>
     *             <hr/>
     *             {{startDate1 | checkTimePeriodOverlap : endDate1 : startDate2 : endDate2 }}
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    checkTimePeriodOverlapFilter.filter('checkTimePeriodOverlap', ['parseDateFilter', function (parseDateFilter) {

        var ensureDateTime = function (value, format) {
            var d = parseDateFilter(value, false, false, format);
            if (d === null) {
                return null;
            } else {
                return d.getTime();
            }
        };

        return function (startDate1, endDate1, startDate2, endDate2, format) {
            // null check and type check
            if (startDate1 === undefined || startDate1 === null ||
                endDate1 === undefined || endDate1 === null ||
                startDate2 === undefined || startDate2 === null ||
                endDate2 === undefined || endDate2 === null) {
                return false; // if anything missing, false
            }
            // do filter
            var startTime1 = ensureDateTime(startDate1, format), endTime1 = ensureDateTime(endDate1, format),
                startTime2 = ensureDateTime(startDate2, format), endTime2 = ensureDateTime(endDate2, format);
            // check values exist
            if (startTime1 === null ||
                endTime1 === null ||
                startTime2 === null ||
                endTime2 === null) {
                return false; // if anything missing, false
            }
            // do comparison
            if (startTime1 <= startTime2 && startTime2 < endTime1) {
                return true; // 2 starts in 1
            }
            if (startTime1 < endTime2 && endTime2 <= endTime1) {
                return true; // 2 ends in 1
            }
            if (startTime2 <= startTime1 && endTime1 <= endTime2) {
                return true; // 1 in 2
            }
            return false;
        };
    }]);

})();