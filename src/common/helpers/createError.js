/**
 * Created by jonbcampos on 2/10/15.
 */
(function () {

    'use strict';

    var createErrorFilter = angular.module('common.helpers.createError', []);

    /**
     * @ngdoc filter
     * @name common.helpers.createError
     *
     * @description
     * Turns an error result, or an array of error results,
     * into a message that can be used for display.
     *
     * @param {object|array} input provided.
     *
     * @returns {string} filtered string.
     * @example
     * <doc:example module="demoApp">
     *     <doc:source>
     *         <script>
     *             function Ctrl($scope) {
     *                $scope.input = [
     *                  {"status": 400, "data": "message A"},
     *                  {"status": 400, "data": "message B"},
     *                  {"status": 400, "data": "message C"}
     *                ];
     *             }
     *         </script>
     *         <div ng-controller="Ctrl">
     *             {{input | createError }}
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     */
    createErrorFilter.filter('createError', ['$rootScope', function ($rootScope) {

        var createMessage = function (value) {
            if (value instanceof Array) {
                var message = "";
                for (var i = 0, n = value.length; i < n; i++) {
                    if (value[i].status !== 200) {
                        message += value[i].data + "\n"; // find the first bad messages
                    }
                }
                return message;
            } else {
                return value.data;
            }
        };

        var createStatus = function (value) {
            if (value instanceof Array) {
                for (var i = 0, n = value.length; i < n; i++) {
                    if (value[i].status !== 200) {
                        return value[i].status; // find the first bad status
                    }
                }
            } else {
                return value.status;
            }
        };

        return function (input, title, retryFunc, revertFunc, retryFuncArgs, revertFuncArgs) {
            // null check
            if (input === undefined || input === null) {
                return null;
            }
            var status = createStatus(input),
                type = "danger",
                showAsModal = true;
            if (200 < status && status < 300) {
                type = "info";
                showAsModal = false;
            }
            // do filter
            var sendData = {
                "title": title,
                "message": createMessage(input),
                "status": status,
                "type": type,
                "showAsModal": showAsModal,
                "timeout": 5000,
                "showDetails": false
            };
            if (revertFunc !== undefined && revertFunc !== null) {
                sendData.revertFunc = revertFunc;
            }
            if (retryFunc !== undefined && retryFunc !== null) {
                sendData.retryFunc = retryFunc;
            }
            if (retryFuncArgs !== undefined && retryFuncArgs !== null) {
                sendData.retryFuncArgs = retryFuncArgs;
            }
            if (revertFuncArgs !== undefined && revertFuncArgs !== null) {
                sendData.revertFuncArgs = revertFuncArgs;
            }
            // send out error
            $rootScope.$emit('systemAlert', sendData);
            return sendData;
        };
    }]);

})();