/**
 * Created by jonbcampos on 10/30/14.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name commands.WatchLoadingCommand
 */
var watchLoadingCommand = angular.module('commands.WatchLoadingCommand', [
    'ui.bootstrap'
]);

/**
 * @ngdoc object
 * @name commands.WatchLoadingCommand
 * @description
 * Injectable command to globally listen for loading changes.
 *
 * @requires $rootScope
 * @requires ui.bootstrap
 */
watchLoadingCommand.factory('WatchLoadingCommand', ['$rootScope', '$modal',
    function ($rootScope, $modal) {

        var command = {};

        /**
         * @ngdoc function
         * @name commands.WatchLoadingCommand:execute
         *
         * @description
         * Watches for any loading server messages.
         *
         * @methodOf commands.WatchLoadingCommand
         */
        command.execute = function () {
            //$rootScope.$on('outstandingSurveysLoadingChanged', command.onChange);
        };

        command.onChange = function (event, value) {
            if (/*OutstandingSurveysModel.outstandingSurveysLoading === true*/false) {
                command.showModal('sections/modals/loading/loading.tpl.html');
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