/**
 * Created by jonbcampos on 10/30/14.
 */
/* global angular */
/* global $ */
/* jshint -W097 */
/* istanbul ignore next */
'use strict';
/**
 * @ngdoc object
 * @name services.WindowService
 */
var WindowServiceModule = angular.module('services.WindowService', []);

/* istanbul ignore next */
/**
 * @ngdoc object
 * @name services.WindowService
 * @description
 * Injectable service to interact with Window.
 *
 * @requires $rootScope
 *
 */
WindowServiceModule.factory('WindowService', ['$rootScope', '$window', '$document',
    function ($rootScope, $window, $document) {

        var service = {};

        //---------------------------------------------------------------------
        //
        //  Methods
        //
        //---------------------------------------------------------------------
        /**
         * @ngdoc function
         * @name services.WindowService:goToRelativeUrl
         *
         * @description
         * moves the window to a specific url relative to this app.
         *
         * @param {object} data to use to request.
         *
         * @methodOf services.WindowService
         */
        service.goToRelativeUrl = function (data) {
            if (!$window.location.origin) {
                var port = ($window.location.port) ? ':' + $window.location.port : '';
                $window.location = $window.location.protocol + "//" + $window.location.hostname + port + data;
            } else {
                $window.location = $window.location.origin + data;
            }
        };

        /**
         * @ngdoc function
         * @name services.WindowService:moveToLocation
         *
         * @description
         * moves to a url location.
         *
         * @methodOf services.WindowService
         */
        service.moveToLocation = function (value) {
            $window.location.href = value;
        };

        /**
         * @ngdoc function
         * @name services.WindowService:getXScrollPosition
         *
         * @description
         * returns the x scroll position.
         *
         * @methodOf services.WindowService
         */
        service.getXScrollPosition = function (data) {
            var doc = $document.documentElement;
            return ($window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        };

        /**
         * @ngdoc function
         * @name services.WindowService:getYScrollPosition
         *
         * @description
         * returns the y scroll position.
         *
         * @methodOf services.WindowService
         */
        service.getYScrollPosition = function (data) {
            var doc = $document.documentElement;
            return ($window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        };

        /**
         * @ngdoc function
         * @name services.WindowService:setScrollPosition
         *
         * @description
         * sets the scroll position for the window.
         *
         * @methodOf services.WindowService
         */
        service.setScrollPosition = function (x, y) {
            //window.scrollTo(x, y);
            $('html,body')
                .animate({scrollLeft: x, scrollTop: y}, 250);
        };

        /**
         * @ngdoc function
         * @name services.WindowService:moveBack
         *
         * @description
         * move back with the window.
         *
         * @methodOf services.WindowService
         */
        service.moveBack = function () {
            $window.history.back();
        };

        //---------------------------------------------------------------------
        //
        //  Initialize
        //
        //---------------------------------------------------------------------
        var initialize = function () {

        };

        //like a cheap constructor
        initialize();
        return service;

    }]);