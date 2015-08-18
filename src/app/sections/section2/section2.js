/**
 * Created by jonbcampos on 9/2/14.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name app.sections.section2
 *
 * @description
 * View module.
 *
 * @requires ui.router
 */
var section2Module = angular.module('app.sections.section2', [
    'ui.router'
]);

/**
 * @ngdoc function
 * @name app.sections.section2:config
 *
 * @description
 * - adds routing between ctrl and view template.
 *
 * @methodOf app.sections.section2
 *
 * @requires $stateProvider
 */
section2Module.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('section2', {
            url: '/section2',
            views: {
                main: {
                    controller: 'section2Ctrl',
                    templateUrl: 'sections/section2/section2.tpl.html'
                }
            },
            data: {pageTitle: 'Section 2'}
        });
}]);

/**
 * @ngdoc object
 * @name app.sections.section2:section2Ctrl
 *
 * @description
 * Controller.
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $location
 *
 */
section2Module.controller('section2Ctrl', ['$rootScope', '$scope', '$location',
    function ($rootScope, $scope, $location) {

        /**
         * @ngdoc function
         * @name app.sections.section2.section2Ctrl:onRegister
         *
         * @description
         * Sets the view on view startup.
         * Binds models to $scope.
         * Adds listeners to $rootScope.
         *
         * @methodOf app.sections.section2:section2Ctrl
         */
        var onRegister = function () {
            //add listeners

            //set binding
            $scope.textValue = "hello";
            //get state
            //set view
        };

        //called at view startup
        onRegister();
    }]);