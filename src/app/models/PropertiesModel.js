/**
 * Created by jonbcampos on 8/19/14.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name models.PropertiesModel
 */
var propertiesModel = angular.module('models.PropertiesModel', [
    'services.PropertiesService'
]);

/**
 * @ngdoc object
 * @name models.PropertiesModel
 * @description
 * Injectable model.
 *
 */
propertiesModel.factory('PropertiesModel', ['$rootScope', 'PropertiesService',
    function ($rootScope, PropertiesService) {

        var model = {};

        //---------------------------------------------------------------------
        //
        //  Properties
        //
        //---------------------------------------------------------------------
        /**
         * @ngdoc property
         * @name models.PropertiesModel#properties
         * @propertyOf models.PropertiesModel
         * @description
         * an object of loaded properties.
         */
        model.properties = null;

        /**
         * @ngdoc property
         * @name models.PropertiesModel#propertiesLoading
         * @propertyOf models.PropertiesModel
         * @description
         * Loading indicator.
         */
        model.propertiesLoading = false;
        //---------------------------------------------------------------------
        //
        //  Methods
        //
        //---------------------------------------------------------------------
        /**
         * @ngdoc function
         * @name models.PropertiesModel#loadProperties
         *
         * @description
         * Loads the properties property.
         *
         * @param {string} name to use in request.
         *
         * @methodOf models.PropertiesModel
         */
        model.loadProperties = function (name) {
            model.propertiesLoading = true;
            model.properties[name] = null;
            $rootScope.$emit('propertiesLoadingChanged', model.propertiesLoading);
            return PropertiesService.loadProperitiesFile(name).then(
                function (value) {
                    var result = value.result, status = value.status;
                    model.propertiesLoading = false;
                    $rootScope.$emit('propertiesLoadingChanged', model.propertiesLoading);
                    model.properties[name] = result;
                    $rootScope.$emit('propertiesChanged', model.properties);
                    return result;
                }, function (value) {
                    var data = value.data, status = value.status;
                    model.propertiesLoading = false;
                    $rootScope.$emit('propertiesLoadingChanged', model.propertiesLoading);
                });
        };
        //---------------------------------------------------------------------
        //
        //  Initialize
        //
        //---------------------------------------------------------------------

        /**
         * @ngdoc function
         * @name models.PropertiesModel#initialize
         *
         * @description
         * Initializes the model by setting necessary defaults.
         *
         * @methodOf models.PropertiesModel
         */
        model.initialize = function () {
            model.properties = {};
        };

        //when the model is ready
        //this calls the initialize
        //similar to some sort of
        //constructor
        model.initialize();
        return model;
    }]);