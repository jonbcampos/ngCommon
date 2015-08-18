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
    'models.SessionModel',
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
    '$timeout', 'SessionModel', 'isSuccessFilter', 'WindowService',
    function ($rootScope, $location, PropertiesModel, PersistenceModel, $q, $timeout, SessionModel, isSuccessFilter, WindowService) {

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
            SessionModel.retrieveData();

            // start something async for promise completion
            // hold old profile id and check against new
            command.oldProfileId = null;
            if (SessionModel.profile !== undefined && SessionModel.profile !== null &&
                SessionModel.profile.userId !== undefined && SessionModel.profile.userId !== null) {
                command.oldProfileId = SessionModel.profile.userId;
            }
            // to clear out models
            SessionModel.loadProfile().then(onSessionModelProfileResult);
            // return deferred for promise
            return command.deferred.promise;
        };

        var onSessionModelProfileResult = function (value) {
            // first, did something come back or throw error?
            if (!isSuccessFilter(value)) {
                if (value.status !== undefined &&
                    value.status !== null &&
                    (value.status.toString() === '511' || value.status.toString() === '503')) {
                    WindowService.goToRelativeUrl('/wps/myportal/ph/tph/appslug/');
                } else {
                    var userMsg = value.data || "Profile Failed To Load";
                    SessionModel.profile = {"userMsg": userMsg};
                    command.originalPath = "/noprofile";
                    onStartupComplete(false);
                }
                return;
            }
            // get profile
            var profile = value.result;

            // second, if the profile id doesn't match old, clear data
            if (command.oldProfileId !== profile.userId) {
                // SomeModel.clearData();
            }

            // TODO something based on profile
            onStartupComplete();

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