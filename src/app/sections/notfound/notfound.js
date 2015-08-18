/**
 * Created by jonbcampos on 11/21/14.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name app.sections.notfound
 *
 * @description
 * View module.
 *
 * @requires ui.router
 */
var notfoundModule = angular.module('app.sections.notfound', [
    'ui.router'
]);

/**
 * @ngdoc function
 * @name app.sections.notfound:config
 *
 * @description
 * - adds routing between ctrl and view template.
 *
 * @methodOf app.sections.notfound
 *
 * @requires $stateProvider
 */
notfoundModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('notfound', {
            url: '/notfound',
            views: {
                main: {
                    controller: 'notfoundCtrl',
                    templateUrl: 'sections/notfound/notfound.tpl.html'
                }
            },
            data: {pageTitle: ''}
        });
}]);

/**
 * @ngdoc object
 * @name app.sections.notfound:notfoundCtrl
 *
 * @description
 * Controller.
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $location
 *
 */
notfoundModule.controller('notfoundCtrl', ['$rootScope', '$scope', '$location',
    function ($rootScope, $scope, $location) {


        /**
         * @ngdoc function
         * @name app.sections.notfound.notfoundCtrl:onRegister
         *
         * @description
         * Sets the view on view startup.
         * Binds models to $scope.
         * Adds listeners to $rootScope.
         *
         * @methodOf app.sections.notfound:notfoundCtrl
         */
        var onRegister = function () {
            //add listeners

            //set binding

            //get state
            //set view
        };

        //called at view startup
        onRegister();
    }]);