/**
 * Created by jonbcampos on 11/21/14.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name app.sections.blank
 *
 * @description
 * View module.
 *
 * @requires ui.router
 */
var blankModule = angular.module('app.sections.blank', [
    'ui.router'
]);

/**
 * @ngdoc function
 * @name app.sections.blank:config
 *
 * @description
 * - adds routing between ctrl and view template.
 *
 * @methodOf app.sections.blank
 *
 * @requires $stateProvider
 */
blankModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('blank', {
            url: '/initializing',
            views: {
                main: {
                    controller: 'blankCtrl',
                    templateUrl: 'sections/blank/blank.tpl.html'
                }
            },
            data: {pageTitle: 'Loading'}
        });
}]);

/**
 * @ngdoc object
 * @name app.sections.blank:blankCtrl
 *
 * @description
 * Controller.
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $location
 *
 */
blankModule.controller('blankCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {


    /**
     * @ngdoc function
     * @name app.sections.blank.blankCtrl:onRegister
     *
     * @description
     * Sets the view on view startup.
     * Binds models to $scope.
     * Adds listeners to $rootScope.
     *
     * @methodOf app.sections.blank:blankCtrl
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