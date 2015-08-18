/**
 * Created by jonbcampos on 8/20/14.
 */
/* global angular */
/* global localStorage */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name models.PersistenceModel
 */
var persistenceModel = angular.module('models.PersistenceModel', [
    'common.filters.createDateFromString'
]);

/**
 * @ngdoc object
 * @name models.PersistenceModel
 * @description
 * Injectable model.
 *
 */
persistenceModel.factory('PersistenceModel', ['createDateFromStringFilter', function (createDateFromStringFilter) {

    var model = {};

    //---------------------------------------------------------------------
    //
    //  Properties
    //
    //---------------------------------------------------------------------
    /**
     * @ngdoc property
     * @name models.PersistenceModel#properties
     * @propertyOf models.PersistenceModel
     * @description
     * The loaded properties.
     */
    model.properties = {};
    var storageName = '';
    //---------------------------------------------------------------------
    //
    //  Methods
    //
    //---------------------------------------------------------------------
    /**
     * @ngdoc function
     * @name models.PersistenceModel#load
     *
     * @description
     * Loads up the data from storage.
     *
     * @methodOf models.PersistenceModel
     */
    model.load = function (name) {
        storageName = name;
        /* istanbul ignore next */
        if (typeof(Storage) === "undefined") {
            //no local storage, stop!
            return false;
        }

        var store = null;
        /* istanbul ignore next */
        try {
            store = localStorage.getItem(storageName);
        } catch (e) {
            return false;
        }
        model.properties = JSON.parse(store);
        /* istanbul ignore next */
        if (model.properties === undefined || model.properties === null) {
            model.properties = {};
        }
        return true;
    };

    /**
     * @ngdoc function
     * @name models.PersistenceModel#clear
     *
     * @description
     * clears out the storage.
     *
     * @methodOf models.PersistenceModel
     */
    model.clear = function () {
        /* istanbul ignore next */
        if (typeof(Storage) === "undefined") {
            //no local storage, stop!
            return false;
        }
        model.properties = {};
        return model.save();
    };

    /**
     * @ngdoc function
     * @name models.PersistenceModel#save
     *
     * @description
     * Persists the data to the storage.
     *
     * @methodOf models.PersistenceModel
     */
    model.save = function () {
        /* istanbul ignore next */
        if (typeof(Storage) === "undefined") {
            //no local storage, stop!
            return false;
        }
        var store = (model.properties === undefined || model.properties === null) ? "" :
                    JSON.stringify(model.properties);
        /* istanbul ignore next */
        try {
            localStorage.setItem(storageName, store);
        } catch (e) {
            return false;
        }
        return true;
    };

    model.nullCheck = function (modelName, propertyName, defaultValue) {
        if (model.properties === undefined || model.properties === null) {
            model.properties = {};
        }
        if (defaultValue === undefined) {
            defaultValue = null;
        }
        if (model.properties[modelName] === undefined || model.properties[modelName] === null) {
            model.properties[modelName] = {};
            model.properties[modelName][propertyName] = defaultValue;
        }
        if (model.properties[modelName][propertyName] === undefined) {
            model.properties[modelName][propertyName] = defaultValue;
        }
    };

    /**
     * @ngdoc function
     * @name models.PersistenceModel#getPropertyAsObject
     *
     * @description
     * returns a property as an object.
     *
     * @methodOf models.PersistenceModel
     */
    model.getPropertyAsObject = function (modelName, propertyName, dateFields) {
        model.nullCheck(modelName, propertyName);
        var result = model.properties[modelName][propertyName];
        if (dateFields === undefined || dateFields === null || dateFields.length === 0) {
            return result;
        }
        /* istanbul ignore next */
        if (Object.prototype.toString.call(result) === '[object Array]') {
            return model.transformFieldsIntoDatesForArray(result, dateFields);
        } else {
            return model.transformFieldsIntoDatesForObject(result, dateFields);
        }
    };

    /**
     * @ngdoc function
     * @name models.PersistenceModel#transformFieldsIntoDatesForArray
     *
     * @description
     * transforms an array of fields into dates.
     *
     * @methodOf models.PersistenceModel
     */
    /* istanbul ignore next */
    model.transformFieldsIntoDatesForArray = function (values, dateFields) {
        for (var i = 0, n = values.length; i < n; i++) {
            values[i] = model.transformFieldsIntoDatesForObject(values[i], dateFields);
        }
        return values;
    };

    /**
     * @ngdoc function
     * @name models.PersistenceModel#transformFieldsIntoDatesForObject
     *
     * @description
     * transforms a field into dates.
     *
     * @methodOf models.PersistenceModel
     */
    /* istanbul ignore next */
    model.transformFieldsIntoDatesForObject = function (value, dateFields) {
        // null check
        if (value === undefined || value === null) {
            return null;
        }
        // null check
        if (dateFields === undefined || dateFields === null || dateFields.length === 0) {
            return value;
        }
        // go through dateFields
        for (var i = 0, n = dateFields.length; i < n; i++) {
            var field = dateFields[i];
            if (!(value.hasOwnProperty(field))) {
                continue; // missing field? skip!
            }
            value[field] = createDateFromStringFilter(value[field]);
            //value[field] = new Date(value[field]);
        }
        return value;
    };

    /**
     * @ngdoc function
     * @name models.PersistenceModel#getPropertyAsNumber
     *
     * @description
     * returns a property as a number.
     *
     * @methodOf models.PersistenceModel
     */
    model.getPropertyAsNumber = function (modelName, propertyName) {
        model.nullCheck(modelName, propertyName, Number.NaN);
        return Number(model.properties[modelName][propertyName]);
    };

    /**
     * @ngdoc function
     * @name models.PersistenceModel#getPropertyAsString
     *
     * @description
     * returns a property as a string.
     *
     * @methodOf models.PersistenceModel
     */
    model.getPropertyAsString = function (modelName, propertyName) {
        model.nullCheck(modelName, propertyName);
        if (model.properties[modelName][propertyName] === undefined || model.properties[modelName][propertyName] === null) {
            return model.properties[modelName][propertyName];
        }
        return model.properties[modelName][propertyName].toString();
    };

    /**
     * @ngdoc function
     * @name models.PersistenceModel#getPropertyAsInt
     *
     * @description
     * returns a property as an integer.
     *
     * @methodOf models.PersistenceModel
     */
    model.getPropertyAsInt = function (modelName, propertyName) {
        model.nullCheck(modelName, propertyName, -1);
        return parseInt(model.properties[modelName][propertyName], 10);
    };

    /**
     * @ngdoc function
     * @name models.PersistenceModel#getPropertyAsBoolean
     *
     * @description
     * returns a property as a boolean.
     *
     * @methodOf models.PersistenceModel
     */
    model.getPropertyAsBoolean = function (modelName, propertyName) {
        model.nullCheck(modelName, propertyName, false);
        if (model.properties[modelName][propertyName] === 'false') {
            return false;
        }
        return model.properties[modelName][propertyName] ? true : false;
    };

    /**
     * @ngdoc function
     * @name models.PersistenceModel#getPropertyAsDate
     *
     * @description
     * returns a property as a date.
     *
     * @methodOf models.PersistenceModel
     */
    model.getPropertyAsDate = function (modelName, propertyName) {
        model.nullCheck(modelName, propertyName);
        if (model.properties[modelName][propertyName] === undefined || model.properties[modelName][propertyName] === null) {
            return null;
        }
        /* istanbul ignore next */
        return createDateFromStringFilter(model.properties[modelName][propertyName]);
        //return new Date(model.properties[modelName][propertyName]);
    };

    /**
     * @ngdoc function
     * @name models.PersistenceModel#setProperty
     *
     * @description
     * sets an object to storage.
     *
     * @methodOf models.PersistenceModel
     */
    model.setProperty = function (modelName, propertyName, value) {
        model.nullCheck(modelName, propertyName);
        model.properties[modelName][propertyName] = value;
    };

    //---------------------------------------------------------------------
    //
    //  Initialize
    //
    //---------------------------------------------------------------------

    /**
     * @ngdoc function
     * @name models.PersistenceModel#initialize
     *
     * @description
     * Initializes the model by setting necessary defaults.
     *
     * @methodOf models.PersistenceModel
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