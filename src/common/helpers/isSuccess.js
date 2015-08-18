/**
 * Created by jonbcampos on 2/10/15.
 */
(function () {

    'use strict';

    var isSuccessFilter = angular.module('common.helpers.isSuccess', []);

    /**
     * @ngdoc filter
     * @name common.helpers.isSuccess
     *
     * @description
     * Determines if the server response is a success or failure.
     *
     * @param {object|array} input provided.
     *
     * @returns {boolean} <code>true</code> for success and <code>false</code> for a failure.
     * @example
     * <doc:example module="demoApp">
     *     <doc:source>
     *         <script>
     *             function Ctrl($scope) {
     *             }
     *         </script>
     *         <div ng-controller="Ctrl">
     *             <p>Nothing to display</p>
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    isSuccessFilter.filter('isSuccess', [function () {

        return function (input) {
            // null check
            if (input === undefined || input === null) {
                return false;
            }
            // do filter
            if (input instanceof Array) {
                for (var i = 0, n = input.length; i < n; i++) {
                    if (!input[i].hasOwnProperty("result") || input[i].result === null) {
                        return false;
                    }
                }
                // all good!
                return true;
            } else {
                if (input.hasOwnProperty("result") && input.result !== null) {
                    return true;
                }
            }
            return false;
        };
    }]);

})();