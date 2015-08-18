/**
 * Created by jonbcampos on 9/18/14.
 */
(function () {

    'use strict';

    var common = angular.module('common.filters.createDateFromString', [
        'common.filters.getTimezoneOffset'
    ]);

    /**
     * @ngdoc filter
     * @name common.filters.createDateFromString
     *
     * @description
     * Turns a string into a proper date.
     *
     * - This was made due to an IE8 date creation issue -
     *
     * @param {string} input provided.
     *
     * @returns {date} created date.
     *
     * @example
     * <doc:example module="demoApp">
     *     <doc:source>
     *         <script>
     *             function Ctrl($scope) {
     *                 $scope.string = "2013-10-18";
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
     *             {{string | createDateFromString }}
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    common.filter('createDateFromString', ['getTimezoneOffsetFilter', function (getTimezoneOffsetFilter) {
        return function (input, time) {
            var DATE_REGEXP = /^\d{4}\-([0,1]\d|[1-9])\-([0-3]\d|[1-9])$/,
                TIME_REGEXP = /^([0-2]\d|\d):([0-5]\d|\d)(?::([0-5]\d|\d))?$/,
                DATETIME_REGEXP = /^\d{4}\-([0,1]\d|[1-9])\-([0-3]\d|[1-9])T([0-2]\d|\d):([0-5]\d|\d):([0-5]\d|\d)(?:\.\d{3})?Z$/;
            if (input === undefined || input === null || input === '') {
                return null;
            }
            // if already date, stop
            if (Object.prototype.toString.call(input) === "[object Date]") {
                return input;
            }
            // if matches 2013-12-19T01:20:02.000Z
            // then we need to split it up and offset to gmt time (Z)
            var milliseconds = 0, offset = 0, isUTCTime = false;
            if (input.match(DATETIME_REGEXP)) {
                var datetimeSplit = input.split("T"),
                    millisecondsBreak = datetimeSplit[1].indexOf(".");
                isUTCTime = true;
                input = datetimeSplit[0];
                datetimeSplit[1] = datetimeSplit[1].replace("Z", "");
                if (millisecondsBreak === -1) {
                    time = datetimeSplit[1];
                } else {
                    time = datetimeSplit[1].substr(0, millisecondsBreak);
                    var millisecondsStr = datetimeSplit[1].substr(millisecondsBreak + 1);
                    milliseconds = Number(millisecondsStr);
                }
            }
            if (!input.match(DATE_REGEXP)) {
                return null;
            }
            // create date
            var split = input.split('-');
            var year = Number(split[0]),
                month = Number(split[1]) - 1,
                date = Number(split[2]),
                hours = 0,
                minutes = 0,
                seconds = 0;
            // create time?
            if (time !== undefined && time !== null && time.match(TIME_REGEXP)) {
                var timeSplit = time.split(':');
                hours = Number(timeSplit[0]);
                minutes = Number(timeSplit[1]);
                if (timeSplit.length === 3) {
                    seconds = Number(timeSplit[2]);
                }
            }
            // if it was UTC (Z) time then we need to see if we also need
            // to offset for daylight savings time, annoying I know
            if (isUTCTime) {
                // first we see if we are in daylight savings time
                var d = new Date(year, month, date, hours, minutes, seconds, milliseconds),
                    jan = new Date(d.getFullYear(), 0, 1),
                    jul = new Date(d.getFullYear(), 6, 1),
                    janOffset = jan.getTimezoneOffset(),
                    julOffset = jul.getTimezoneOffset();
                offset = d.getTimezoneOffset();
                //if (offset < Math.max(janOffset, julOffset)) {
                //    offset = Math.max(janOffset, julOffset);
                //}
            }
            // create it! finally!!
            return new Date(year, month, date, hours, minutes - offset, seconds, milliseconds);
        };
    }]);

})();