/* global angular */
/* global window */
/* global location */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name app
 *
 * @description
 * Main app module.
 *
 */
var appModule = angular.module('app', [
    'angulartics',
    'angulartics.google.analytics',
    'templates-app',
    'templates-common',
    'ui.router',
    'ui.bootstrap',
    // models
    'models.NotificationModel',
    'models.PropertiesModel',
    // sections
    'app.sections.section1',
    'app.sections.section2',
    'app.sections.notfound',
    'app.sections.blank',
    // modals
    'app.sections.modals.confirm',
    'app.sections.modals.error',
    'app.sections.modals.logout',
    'app.sections.modals.retry',
    // commands
    'commands.StartupCommand',
    'commands.WatchDeletingCommand',
    'commands.WatchLoadingCommand',
    'commands.WatchSavingCommand'
]);

/**
 * @ngdoc function
 * @name app:config
 *
 * @description
 * Adds listener for uncaught exceptions.
 *
 * @methodOf app
 *
 * @requires $stateProvider
 * @requires $urlRouterProvider
 * @requires $httpProvider
 * @requires $provide
 */
/* istanbul ignore next */
appModule.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$provide',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $provide) {
        $urlRouterProvider.otherwise('section1');
        //custom error logging
        $provide.decorator('$exceptionHandler', ['$delegate', '$injector', function ($delegate, $injector) {
            return function (exception, cause) {
                $delegate(exception, cause);
                var rScope = $injector.get('$rootScope');
                rScope.$emit('systemAlert', {
                    title: 'Uncaught Exception',
                    message: exception.message,
                    type: 'danger',
                    timeout: 4000
                });
            };
        }]);
        // TODO remove this! only for early development
        $httpProvider.interceptors.push('localDataInjector');
    }]);

// TODO remove this!
// this is only intended during early development!!!
/* istanbul ignore next */
appModule.factory('localDataInjector', [function () {
    var localDataInjector = {
        request: function (config) {
            return config;
        }
    };
    return localDataInjector;
}]);

/**
 * @ngdoc function
 * @name app:run
 *
 * @description
 * Startup method. Starts loading the modules.
 *
 * @methodOf app
 *
 */
/* istanbul ignore next */
appModule.run(['StartupCommand', '$rootScope', '$state', '$stateParams', 'WatchDeletingCommand', 'WatchLoadingCommand',
    'WatchSavingCommand',
    function run(StartupCommand, $rootScope, $state, $stateParams, WatchDeletingCommand, WatchLoadingCommand, WatchSavingCommand) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        StartupCommand.execute().then(function (value) {
            // Do something
            WatchDeletingCommand.execute();
            WatchLoadingCommand.execute();
            WatchSavingCommand.execute();
            // alert app of being ready
            $rootScope.$emit('applicationReadyChange', true);
        });
    }]);

/**
 * @ngdoc object
 * @name app.main:appCtrl
 *
 * @description
 * Main app controller.
 *
 * @requires $location
 * @requires $scope
 *
 */
appModule.controller('appCtrl', ['$rootScope', '$scope', '$location', 'WindowService',
    function ($rootScope, $scope, $location, WindowService) {

        /**
         * @ngdoc function
         * @name app.main.appCtrl:toggleNav
         *
         * @description
         * Toggles the nav visibility.
         *
         * @methodOf app.main:appCtrl
         */
        $scope.toggleNav = function () {
            $scope.isNavOpen = ($scope.isNavOpen) ? false : true;
        };

        /**
         * @ngdoc function
         * @name app.main.appCtrl:openNav
         *
         * @description
         * Sets true the nav visibility.
         *
         * @methodOf app.main:appCtrl
         */
        $scope.openNav = function () {
            $scope.isNavOpen = true;
        };

        /**
         * @ngdoc function
         * @name app.main.appCtrl:closeNav
         *
         * @description
         * Sets false the nav visibility.
         *
         * @methodOf app.main:appCtrl
         */
        $scope.closeNav = function () {
            $scope.isNavOpen = false;
        };

        /**
         * @ngdoc function
         * @name app.main.appCtrl:onStateChangeStartHandler
         *
         * @description
         * responds to the state change start event.
         *
         * @methodOf app.main:appCtrl
         */
        $scope.onStateChangeStartHandler = function (event, toState, toParams, fromState, fromParams) {
            // no matter what we can send them to the fault pages
            if (toState.url === '/notfound' || toState.url === '/initializing') {
                return;
            }
        };

        /**
         * @ngdoc function
         * @name app.main.appCtrl:onStateChangeSuccessHandler
         *
         * @description
         * Sets the page title based on state changes.
         *
         * @param {event} event from $scope.
         * @param {object} toState from $scope.
         * @param {object} toParams from $scope.
         * @param {object} fromState from $scope.
         * @param {object} fromParams from $scope.
         *
         * @methodOf app.main:appCtrl
         */
        $scope.onStateChangeSuccessHandler = function (event, toState, toParams, fromState, fromParams) {
            //close nav
            $scope.isNavOpen = false;
            //update title
            if (angular.isDefined(toState.data.pageTitle) && toState.data.pageTitle != null) {
                $scope.pageTitle = toState.data.pageTitle;
            } else {
                $scope.pageTitle = '';
            }
            // scroll to top
            WindowService.setScrollPosition(0, 0);
        };

        /**
         * @ngdoc function
         * @name app.main.appCtrl:onApplicationReadyChangeHandler
         *
         * @description
         * responds to the applicationReadyChange event.
         *
         * @methodOf app.main:appCtrl
         */
        $scope.onApplicationReadyChangeHandler = function (event, value) {
            $scope.isReady = true;
        };

        /**
         * @ngdoc function
         * @name app.main.appCtrl:onRegister
         *
         * @description
         * Sets the view on view startup. Binds models to $scope. Adds listeners to $rootScope.
         *
         * @methodOf app.main:appCtrl
         */
        var onRegister = function () {
            //add listeners
            $scope.$on('$stateChangeStart', $scope.onStateChangeStartHandler);
            $scope.$on('$stateChangeSuccess', $scope.onStateChangeSuccessHandler);
            $rootScope.$on('applicationReadyChange', $scope.onApplicationReadyChangeHandler);
            //set binding
            //get state
            //set view
            $scope.isNavOpen = false;
            $scope.isReady = false;
        };

        onRegister();
    }]);

/**
 * @ngdoc object
 * @name app.main:alertBoxCtrl
 *
 * @description
 * Controller used for the alert box.
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $compile
 *
 */
appModule.controller('alertBoxCtrl', ['$scope', '$rootScope', '$compile', 'NotificationModel', 'WindowService',
    '$modal',
    function ($scope, $rootScope, $compile, NotificationModel, WindowService, $modal) {

        /**
         * @ngdoc function
         * @name app.main.alertBoxCtrl:onSystemAlert
         *
         * @description
         * Responses to systemAlert event.
         *
         * @param {event} event received.
         * @param {object} data to display.
         *
         * @methodOf app.main:alertBoxCtrl
         */
        $scope.onSystemAlert = function (event, data) {
            // null check
            if (data === undefined || data === null) {
                return; //stop!
            }
            data.status = data.status || 0;
            var statusString = data.status.toString();
            switch (statusString) {
                case '511'://invalid session
                    $scope.showModal('sections/modals/logout/logout.tpl.html', 'logoutCtrl', {
                        "title": "Session Timeout",
                        "message": "Your session has expired. You will be prompted to login in order to return to the application. Your progress to this point has been saved."
                    }).then(
                        function (value) {
                            // need to relogin
                            $scope.hideModal();
                            WindowService.goToRelativeUrl('/wps/myportal/ph/tph/appslug/');
                        });
                    break;
                //case '400': //bad request, just error and stop
                //    showSystemAlert(event, data, 'sections/modals/error/error.tpl.html', 'errorCtrl');
                //    break;
                //case '999': //general error, give them retry ability
                default: // same as 999, give them retry ability
                    $scope.showSystemAlert(event, data, 'sections/modals/retry/retry.tpl.html', 'retryCtrl');
                    break;
            }
        };

        $scope.showSystemAlert = function (event, data, template, ctrl) {
            if (data.timeout === undefined) {
                data.timeout = 0;
            }
            if (data.showAsModal === true) {
                $scope.showModal(template, ctrl, data).then(
                    function (value) {
                        // need to retry
                        NotificationModel.removeItem(value);
                        $scope.hideModal();
                    }, function (value) {
                        // need to revert
                        NotificationModel.removeItem(value);
                        $scope.hideModal();
                    });
            } else {
                NotificationModel.addItem(data.title, data.type, data.message, data.timeout, data.showDetails);
            }
        };

        $scope.modalInstance = null;
        $scope.showModal = function (template, controller, data) {
            if ($scope.modalInstance !== null) {
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
            if (data !== undefined && data !== null) {
                modalVars.resolve = {
                    "data": function () {
                        return data;
                    }
                };
            }
            $scope.modalInstance = $modal.open(modalVars);
            return $scope.modalInstance.result;
        };

        $scope.hideModal = function () {
            if ($scope.modalInstance !== null) {
                $scope.modalInstance.close();
            }
            $scope.modalInstance = null;
        };

        /**
         * @ngdoc function
         * @name app.main.alertBoxCtrl:removeNotification
         *
         * @description
         * Removes a notification.
         *
         * @param {object} item being displayed.
         *
         * @methodOf app.main:alertBoxCtrl
         */
        $scope.removeNotification = function (item) {
            NotificationModel.removeItem(item);
        };

        /**
         * @ngdoc function
         * @name app.main.alertBoxCtrl:onHelpLinkClick
         *
         * @description
         * goes to the help link.
         *
         * @methodOf app.main:alertBoxCtrl
         */
        $scope.onHelpLinkClick = function () {
            WindowService.goToRelativeUrl('/wps/myportal/ph/appslug');
        };

        /**
         * @ngdoc function
         * @name app.main.alertBoxCtrl:onRegister
         *
         * @description
         * Sets the view on view startup. Binds models to $scope. Adds listeners to $rootScope.
         *
         * @methodOf app.main:alertBoxCtrl
         */
        var onRegister = function () {
            //add listeners
            $rootScope.$on('systemAlert', $scope.onSystemAlert);
            //set binding
            $scope.NotificationModel = NotificationModel;
            //get state
            //set view
            //showDismissableAlert({type:"danger",title:"test",message:"test test"});
            //onSystemAlert(null, {type:"danger",title:"test",message:"test test"});
        };

        //called at view startup
        onRegister();
    }]);