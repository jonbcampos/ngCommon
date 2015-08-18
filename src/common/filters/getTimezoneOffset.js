/**
 * Created by jonbcampos on 4/29/15.
 */
(function () {

    'use strict';

    var getTimezoneOffsetFilter = angular.module('common.filters.getTimezoneOffset', []);

    /**
     * @ngdoc filter
     * @name common.filters.getTimezoneOffset
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
     *             {{string | getTimezoneOffset }}
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    getTimezoneOffsetFilter.filter('getTimezoneOffset', [function () {
        // This was created as a helper mainly for
        // testing. I know if you find this you will
        // see it as a strange decision and I agree it
        // was, but it helped to make the tests work
        // no matter the timezone the runner is in
        // since so many tests rely on timezone output.
        // This is just something you'll have to accept.
        // On the plus side we only calculate (the very minor)
        // function of the current timezone once.
        // The downside is we hold that data in memory.
        var filter = {};

        filter.offset = Number.NaN;

        filter.getTimezone = function () {
            // only pull it once
            if (isNaN(filter.offset)) {
                filter.offset = new Date().getTimezoneOffset();
            }
            return filter.offset;
        };

        return filter;
    }]);

})();