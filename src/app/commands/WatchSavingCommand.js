/**
 * Created by jonbcampos on 10/30/14.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name commands.WatchSavingCommand
 */
var watchSavingCommand = angular.module('commands.WatchSavingCommand', [
    'ui.bootstrap'
]);

/**
 * @ngdoc object
 * @name commands.WatchSavingCommand
 * @description
 * Injectable command to globally listen for saving changes.
 *
 * @requires $rootScope
 * @requires ui.bootstrap
 */
watchSavingCommand.factory('WatchSavingCommand', ['$rootScope', '$modal',
    function ($rootScope, $modal) {

        var command = {};

        /**
         * @ngdoc function
         * @name commands.WatchSavingCommand:execute
         *
         * @description
         * Watches for any saving server messages.
         *
         * @methodOf commands.WatchSavingCommand
         */
        command.execute = function () {
            //$rootScope.$on('selectedSurveySavingChanged', command.onChange);
        };

        command.onChange = function (event, value) {
            if (/*SelectedSurveyModel.selectedSurveySaving === true*/false) {
                command.showModal('sections/modals/saving/saving.tpl.html');
            } else {
                command.hideModal();
            }
        };

        command.modalInstance = null;
        command.showModal = function (template, controller) {
            if (command.modalInstance !== null) {
                return null; //stop if already showing loading
            }
            var modalVars = {
                templateUrl: template,
                backdrop: 'static',
                keyboard: false
            };
            if (controller !== null) {
                modalVars.controller = controller;
            }
            command.modalInstance = $modal.open(modalVars);
            return command.modalInstance.result;
        };

        command.hideModal = function () {
            if (command.modalInstance !== null) {
                command.modalInstance.close();
            }
            command.modalInstance = null;
        };

        return command;

    }]);