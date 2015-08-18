/**
 * Created by jonbcampos on 2/25/14.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name commands.StartupCommand
 */
var startupCommand = angular.module('commands.StartupCommand', [
    'models.PropertiesModel',
    'models.PersistenceModel',
    'common.helpers.isSuccess',
    'services.WindowService'
]);

/**
 * @ngdoc object
 * @name commands.StartupCommand
 * @description
 * Injectable command to modularize code.
 *
 * @requires $resource
 */
startupCommand.factory('StartupCommand', ['$rootScope', '$location', 'PropertiesModel', 'PersistenceModel', '$q',
    '$timeout',
    function ($rootScope, $location, PropertiesModel, PersistenceModel, $q, $timeout) {

        var command = {};

        /**
         * @ngdoc function
         * @name commands.StartupCommand:execute
         *
         * @description
         * Start up the application.
         *
         * @methodOf commands.StartupCommand
         */
        command.execute = function () {
            // get state
            getUrlState($location);
            // start deferred
            command.deferred = $q.defer();
            // load up properties
            PersistenceModel.load('yourappname');
            // load up models

            // wait
            command.timeoutDeregister = $timeout(function () {
                onStartupComplete(true);
                command.timeoutDeregister = null;
            });
            // return deferred for promise
            return command.deferred.promise;
        };



        var onStartupComplete = function (value) {
            moveToState();
            command.deferred.resolve(value);
        };

        var getUrlState = function (location) {
            command.originalPath = location.path();
            command.search = location.search();
            location.path("/initializing");
        };

        var moveToState = function () {
            // if they hit refresh during initializing
            // they obviously don't want to go there
            if (command.originalPath.indexOf('initializing') > -1) {
                command.originalPath = '/';
            }
            // TODO check for roles
            // if they are not an admin but wanted
            // to go there we need to stop them
            //if (!SessionModel.profile.admin && command.originalPath.indexOf('admin') > -1) {
            //    command.originalPath = '/';
            //}
            // go to where they originally asked
            $location.path(command.originalPath);
            $location.search(command.search);
        };

        return command;

    }]);