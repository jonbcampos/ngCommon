/**
 * Created by jonbcampos on 6/9/15.
 */
(function () {

    'use strict';

    var handleServiceResponseFilter = angular.module('common.helpers.handleServiceResponse', []);

    /**
     * @ngdoc filter
     * @name common.helpers.handleServiceResponse
     *
     * @description
     * A simple way to respond to all service responses in one place.
     *
     * @param {string} input provided by server.
     * @param {number} status provided by server.
     * @param {array} headers provided by server.
     * @param {object} config provided for request.
     * @param {object} deferred object to respond to.
     * @param {function} parseFunc to use in case we need to parse the result or do any data manipulation (optional).
     *
     * @returns {object} the response.
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
    handleServiceResponseFilter.filter('handleServiceResponse', [function () {
        return function (input, status, headers, config, deferred, parseFunc) {
            // double check portal login issues
            if (status === 511) {
                deferred.reject({"data": input, "status": status});
                return input;
            }
            // TODO custom app response code logic
            //if (status.toString() === "208") {
            //    deferred.reject({"data": input, "status": 208});
            //    return input;
            //}
            // good place for post processing
            var results = input;
            if (parseFunc !== undefined && parseFunc !== null) {
                results = parseFunc.call(this, input);
            }
            deferred.resolve({"result": results, "status": status});
            return input;
        };
    }]);

})();