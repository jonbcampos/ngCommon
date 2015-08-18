/**
 * Created by jonbcampos on 4/14/15.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name app.sections.modals.logout
 *
 * @description
 * View module.
 *
 * @requires ui.router
 */
var logoutModule = angular.module('app.sections.modals.logout', [
    'ui.router',
    'ui.bootstrap',
    'services.WindowService'
]);

/**
 * @ngdoc object
 * @name app.sections.modals.logout:logoutCtrl
 *
 * @description
 * Controller.
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $location
 *
 */
logoutModule.controller('logoutCtrl', ['$rootScope', '$scope', '$location', '$modalInstance', 'data', 'WindowService',
    function ($rootScope, $scope, $location, $modalInstance, data, WindowService) {

        /**
         * @ngdoc function
         * @name app.sections.modals.logout.logoutCtrl:close
         *
         * @description
         * responds to the close button.
         *
         * @methodOf app.sections.modals.logout:logoutCtrl
         */
        $scope.close = function () {
            $modalInstance.close(true);
        };

        /**
         * @ngdoc function
         * @name app.sections.modals.logout.logoutCtrl:onHelpLinkClick
         *
         * @description
         * goes to the help link.
         *
         * @methodOf app.sections.modals.logout:logoutCtrl
         */
        $scope.onHelpLinkClick = function () {
            WindowService.goToRelativeUrl('/wps/myportal/ph/hdexpress');
        };

        /**
         * @ngdoc function
         * @name app.sections.modals.logout.logoutCtrl:onRegister
         *
         * @description
         * Sets the view on view startup.
         * Binds models to $scope.
         * Adds listeners to $rootScope.
         *
         * @methodOf app.sections.modals.logout:logoutCtrl
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

