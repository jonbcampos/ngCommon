/**
 * Created by jonbcampos on 8/5/14.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name app.sections.modals.confirm
 *
 * @description
 * View module.
 *
 * @requires ui.router
 * @requires ui.bootstrap
 */
var confirmModule = angular.module('app.sections.modals.confirm', [
    'ui.router',
    'ui.bootstrap'
]);

/**
 * @ngdoc object
 * @name app.sections.modals.confirm:confirmCtrl
 *
 * @description
 * Controller.
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $location
 * @requires $modalInstance
 *
 */
confirmModule.controller('confirmCtrl', ['$rootScope', '$scope', '$location', '$modalInstance', 'confirmText',
    function ($rootScope, $scope, $location, $modalInstance, confirmText) {

        /**
         * @ngdoc function
         * @name app.sections.modals.confirm.confirmCtrl:accept
         *
         * @description
         * Responds to the affirmative button.
         *
         * @methodOf app.sections.modals.confirm:confirmCtrl
         */
        $scope.accept = function () {
            $modalInstance.close(true);
        };

        /**
         * @ngdoc function
         * @name app.sections.modals.confirm.confirmCtrl:cancel
         *
         * @description
         * Responds to the reject button.
         *
         * @methodOf app.sections.modals.confirm:confirmCtrl
         */
        $scope.cancel = function () {
            $modalInstance.dismiss(false);
        };

        /**
         * @ngdoc function
         * @name app.sections.modals.confirm.confirmCtrl:onRegister
         *
         * @description
         * Sets the view on view startup.
         * Binds models to $scope.
         * Adds listeners to $rootScope.
         *
         * @methodOf app.sections.modals.confirm:confirmCtrl
         */
        var onRegister = function () {
            //add listeners

            //set binding
            $scope.confirmText = confirmText;
            //get state
            //set view
        };

        //called at view startup
        onRegister();
    }]);