/**
 * Created by jonbcampos on 2/9/15.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name app.sections.modals.retry
 *
 * @description
 * View module.
 *
 * @requires ui.router
 */
var retryModule = angular.module('app.sections.modals.retry', [
    'ui.router',
    'ui.bootstrap',
    'services.WindowService'
]);

/**
 * @ngdoc object
 * @name app.sections.modals.retry:retryCtrl
 *
 * @description
 * Controller.
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $location
 *
 */
retryModule.controller('retryCtrl', ['$rootScope', '$scope', '$location', '$modalInstance', 'data', 'WindowService',
    function ($rootScope, $scope, $location, $modalInstance, data, WindowService) {

        /**
         * @ngdoc function
         * @name app.sections.modals.retry.retryCtrl:retry
         *
         * @description
         * indicates a retry request from the user.
         *
         * @methodOf app.sections.modals.retry:retryCtrl
         */
        $scope.retry = function () {
            if (data.retryFunc !== undefined && data.retryFunc !== null) {
                data.retryFunc.call(this, data.retryFuncArgs);
            }
            $modalInstance.close(data);
        };

        /**
         * @ngdoc function
         * @name app.sections.modals.retry.retryCtrl:revert
         *
         * @description
         * indicates a revert request from the user.
         *
         * @methodOf app.sections.modals.retry:retryCtrl
         */
        $scope.revert = function () {
            if (data.revertFunc !== undefined && data.revertFunc !== null) {
                data.revertFunc.call(this, data.revertFuncArgs);
            }
            $modalInstance.dismiss(data);
        };

        /**
         * @ngdoc function
         * @name app.sections.modals.retry.retryCtrl:onHelpLinkClick
         *
         * @description
         * goes to the help link.
         *
         * @methodOf app.sections.modals.retry:retryCtrl
         */
        $scope.onHelpLinkClick = function () {
            WindowService.goToRelativeUrl('/wps/myportal/ph/hdexpress');
        };

        /**
         * @ngdoc function
         * @name app.sections.modals.retry.retryCtrl:onRegister
         *
         * @description
         * Sets the view on view startup.
         * Binds models to $scope.
         * Adds listeners to $rootScope.
         *
         * @methodOf app.sections.modals.retry:retryCtrl
         */
        var onRegister = function () {
            //add listeners

            //set binding
            $scope.title = data.title;
            $scope.message = data.message;
            if (data.revertFunc !== undefined && data.revertFunc !== null) {
                $scope.revertLabel = "Revert";
                $scope.revertIcon = "reply";
            } else {
                $scope.revertLabel = "Close";
                $scope.revertIcon = "times";
            }
            //get state
            //set view
        };

        //called at view startup
        onRegister();
    }]);