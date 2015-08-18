/**
 * Created by jonbcampos on 12/9/14.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name app.sections.modals.error
 *
 * @description
 * View module.
 *
 * @requires ui.router
 * @requires ui.bootstrap
 * @requires services.WindowService
 */
var errorModule = angular.module('app.sections.modals.error', [
    'ui.router',
    'ui.bootstrap',
    'services.WindowService'
]);

/**
 * @ngdoc object
 * @name app.sections.modals.error:errorCtrl
 *
 * @description
 * Controller.
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $location
 * @requires $modalInstance
 * @requires data
 * @requires services.WindowService
 *
 */
errorModule.controller('errorCtrl', ['$rootScope', '$scope', '$location', '$modalInstance', 'data', 'WindowService',
    function ($rootScope, $scope, $location, $modalInstance, data, WindowService) {

        /**
         * @ngdoc function
         * @name app.sections.modals.error.errorCtrl:accept
         *
         * @description
         * responds to the okay button.
         *
         * @methodOf app.sections.modals.error:errorCtrl
         */
        $scope.accept = function () {
            $modalInstance.close(data);
        };

        /**
         * @ngdoc function
         * @name app.sections.modals.error.errorCtrl:onHelpLinkClick
         *
         * @description
         * goes to the help link.
         *
         * @methodOf app.sections.modals.error:errorCtrl
         */
        $scope.onHelpLinkClick = function () {
            WindowService.goToRelativeUrl('/wps/myportal/ph/hdexpress');
        };

        /**
         * @ngdoc function
         * @name app.sections.modals.error.errorCtrl:onRegister
         *
         * @description
         * Sets the view on view startup.
         * Binds models to $scope.
         * Adds listeners to $rootScope.
         *
         * @methodOf app.sections.modals.error:errorCtrl
         */
        var onRegister = function () {
            //add listeners

            //set binding
            $scope.title = data.title;
            $scope.message = data.message;
            //get state
            //set view
        };

        //called at view startup
        onRegister();
    }]);