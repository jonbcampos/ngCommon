/**
 * Created by jonbcampos on 10/30/14.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name commands.WatchDeletingCommand
 */
var watchDeletingCommand = angular.module('commands.WatchDeletingCommand', [
    'ui.bootstrap'
]);

/**
 * @ngdoc object
 * @name commands.WatchDeletingCommand
 * @description
 * Injectable command to globally listen for deleting changes.
 *
 * @requires $rootScope
 * @requires ui.bootstrap
 */
watchDeletingCommand.factory('WatchDeletingCommand', ['$rootScope', '$modal',
    function ($rootScope, $modal) {

        var command = {};

        /**
         * @ngdoc function
         * @name commands.WatchDeletingCommand:execute
         *
         * @description
         * Watches for any deleting server messages.
         *
         * @methodOf commands.WatchDeletingCommand
         */
        command.execute = function () {
            //$rootScope.$on('selectedSurveyDeletingChanged', command.onChange);
        };

        command.onChange = function (event, value) {
            if (/*SelectedCardRequestModel.selectedCardRequestDeleting === true*/false) {
                command.showModal('sections/modals/deleting/deleting.tpl.html');
            } else {
                command.hideModal();
            }
        };

        command.modalInstance = null;
        command.showModal = function (template) {
            if (command.modalInstance !== null) {
                return null; //stop if already showing loading
            }
            var modalVars = {
                templateUrl: template,
                backdrop: 'static',
                keyboard: false
            };
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