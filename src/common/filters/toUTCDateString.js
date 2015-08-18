/**
 * Created by jonbcampos on 4/29/15.
 */
(function () {

    'use strict';

    var toUTCDateStringFilter = angular.module('common.filters.toUTCDateString', []);

    /**
     * @ngdoc filter
     * @name common.filters.toUTCDateString
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
     *             {{string | toUTCDateString }}
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    toUTCDateStringFilter.filter('toUTCDateString', [function () {
        return function (input) {
            // null check
            if (input === undefined || input === null || input.length === 0) {
                return null;
            }
            // not a date? stop
            if (Object.prototype.toString.call(input) !== "[object Date]") {
                return null;
            }
            // do filter, Tue, Apr 11, 2015
            var daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return daysOfTheWeek[input.getUTCDay()] + ', ' +
                months[input.getUTCMonth()] + ' ' +
                input.getUTCDate() + ', ' +
                input.getUTCFullYear();
        };
    }]);

})();