/**
 * Created by jonbcampos on 9/2/14.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name app.sections.section1
 *
 * @description
 * View module.
 *
 * @requires ui.router
 */
var section1Module = angular.module('app.sections.section1', [
    'ui.router'
]);

/**
 * @ngdoc function
 * @name app.sections.section1:config
 *
 * @description
 * - adds routing between ctrl and view template.
 *
 * @methodOf app.sections.section1
 *
 * @requires $stateProvider
 */
section1Module.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('section1', {
            url: '/section1',
            views: {
                main: {
                    controller: 'section1Ctrl',
                    templateUrl: 'sections/section1/section1.tpl.html'
                }
            },
            data: {pageTitle: 'Section 1'}
        });
}]);

/**
 * @ngdoc object
 * @name app.sections.section1:section1Ctrl
 *
 * @description
 * Controller.
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $location
 *
 */
section1Module.controller('section1Ctrl', ['$rootScope', '$scope', '$location',
    function ($rootScope, $scope, $location) {

        /**
         * @ngdoc function
         * @name app.sections.section1.section1Ctrl:onRegister
         *
         * @description
         * Sets the view on view startup.
         * Binds models to $scope.
         * Adds listeners to $rootScope.
         *
         * @methodOf app.sections.section1:section1Ctrl
         */
        var onRegister = function () {
            //add listeners

            //set binding
            $scope.textValue = "hi";
            //get state
            //set view
        };

        //called at view startup
        onRegister();
    }]);