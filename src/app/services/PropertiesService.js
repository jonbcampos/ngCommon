/**
 * Created by jonbcampos on 8/19/14.
 */
/* global angular */
/* global document */
/* global navigator */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name services.PropertiesService
 */
var PropertiesServiceModule = angular.module('services.PropertiesService', []);

/**
 * @ngdoc object
 * @name services.PropertiesService
 * @description
 * Injectable service to _.
 *
 */
PropertiesServiceModule.factory('PropertiesService', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {

    var service = {};

    //---------------------------------------------------------------------
    //
    //  Methods
    //
    //---------------------------------------------------------------------
    /**
     * @ngdoc function
     * @name services.PropertiesService:loadProperitiesFile
     *
     * @description
     * loads a specific properties file by name.
     *
     * @param {object} name to use to request.
     *
     * @methodOf services.PropertiesService
     */
    service.loadProperitiesFile = function (name) {
        var deferred = $q.defer();

        $http({method: 'GET', url: './assets/data/' + name + '.json'}).success(
            function (result, status, headers, config) {
                //good place for post processing
                deferred.resolve({"result": result, "status": status});
            }).error(
            function (data, status, headers, config) {
                deferred.reject({"data": data, "status": status});
            });
        return deferred.promise;
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