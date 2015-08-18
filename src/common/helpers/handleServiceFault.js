/**
 * Created by jonbcampos on 6/9/15.
 */
(function () {

    'use strict';

    var handleServiceFaultFilter = angular.module('common.helpers.handleServiceFault', []);

    /**
     * @ngdoc filter
     * @name common.helpers.handleServiceFault
     *
     * @description
     * A simple way to respond to all service faults in one place.
     *
     * @param {string} input provided by server.
     * @param {number} status provided by server.
     * @param {array} headers provided by server.
     * @param {object} config provided for request.
     * @param {object} deferred object to respond to.
     *
     * @returns {object} the fault response.
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
    handleServiceFaultFilter.filter('handleServiceFault', [function () {
        return function (input, status, headers, config, deferred) {
            // do something for all errors here
            deferred.reject({"data": input, "status": status});
            return input;
        };
    }]);

})();