/**
 * Created by jonbcampos on 1/30/15.
 */
(function () {

    'use strict';

    var parseDateFilter = angular.module('common.filters.parseDate', [
        'common.filters.getTimezoneOffset'
    ]);

    /**
     * @ngdoc filter
     * @name common.filters.parseDate
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
     *             {{string | parseDate }}
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    parseDateFilter.filter('parseDate', ['getTimezoneOffsetFilter', function (getTimezoneOffsetFilter) {

        var parserByFormat = null;

        var parseWithIgnoreHours = function (value, setHours, setMinutes, setSeconds, setMilliseconds) {
            var regexpPattern = /^\d{4}\-[0-1]?\d\-[0-3]?\dT[0-2]?\d:[0-5]?\d:[0-5]?\d.\d{3} [+-]\d{4}$/;
            // bad format check
            if (!value.match(regexpPattern)) {
                return null;
            }
            setHours = setHours || 0;
            setMinutes = setMinutes || 0;
            setSeconds = setSeconds || 0;
            setMilliseconds = setMilliseconds || 0;
            // split split split!
            var dateTimeSplit = value.split("T"),
                dateSplit = dateTimeSplit[0].split("-"),
                d = new Date(dateSplit[0], Number(dateSplit[1]) - 1, dateSplit[2], setHours, setMinutes, setSeconds, setMilliseconds);
            return d;
        };

        var parseWithFormat = function (value, format, ignoreTimezone) {
            if (parserByFormat === null) {
                parserByFormat = {};
            }
            // only able to ignore timezone if we match a specific format
            var regexpPattern = /^\d{4}\-[0-1]?\d\-[0-3]?\dT[0-2]?\d:[0-5]?\d:[0-5]?\d.\d{3} [+-]\d{4}$/,
                timezoneOffset = getTimezoneOffsetFilter.getTimezone(),
                finalDate = null;
            // check format, throw null if incorrect
            if (!value.match(regexpPattern)) {
                return null;
            }
            //
            var dateTimeSplit = value.split("T"),
                dateSplit = dateTimeSplit[0].split("-"),
                timeWithZoneSplit = dateTimeSplit[1].split(" "),
                timeSplit = timeWithZoneSplit[0].split(":"),
                secondsMillisecondsSplit = timeSplit[2].split("."),
                timezoneSplit = timeWithZoneSplit[1].split(''),
                yearValue = Number(dateSplit[0]),
                monthValue = Number(dateSplit[1]) - 1,
                dayValue = Number(dateSplit[2]),
                hourValue = Number(timeSplit[0]),
                minuteValue = Number(timeSplit[1]),
                secondValue = Number(secondsMillisecondsSplit[0]),
                millisecondValue = Number(secondsMillisecondsSplit[1]),
                minutesOffset = (Number(timezoneSplit[1]) * 10 * 60) + (Number(timezoneSplit[2]) * 60) + (Number(timezoneSplit[3]) * 10) + Number(timezoneSplit[4]);
            if (ignoreTimezone) {
                var hoursOffsetUTC = minutesOffset / 60;
                finalDate = new Date(Date.UTC(yearValue, monthValue, dayValue, hourValue + hoursOffsetUTC, minuteValue, secondValue, millisecondValue));
            } else {
                var hoursOffset = (minutesOffset - timezoneOffset) / 60;
                finalDate = new Date(yearValue, monthValue, dayValue, hourValue + hoursOffset, minuteValue, secondValue, millisecondValue);
            }
            return finalDate;
        };

        return function (input, ignoreHours, ignoreTimezone, dateFormat, setHours, setMinutes, setSeconds, setMilliseconds) {
            // null check
            if (input === undefined || input === null || input.length === 0) {
                return null;
            }
            ignoreHours = ignoreHours || false;
            ignoreTimezone = ignoreTimezone || false;
            // if already date, stop
            if (Object.prototype.toString.call(input) === "[object Date]") {
                return input;
            }
            if (ignoreHours === true) {
                return parseWithIgnoreHours(input, setHours, setMinutes, setSeconds, setMilliseconds);
            } else {
                return parseWithFormat(input, dateFormat, ignoreTimezone);
            }
        };
    }]);

})();