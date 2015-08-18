/**
 * Created by jonbcampos on 8/4/14.
 */
/* global angular */
/* jshint -W097 */
'use strict';
/**
 * @ngdoc object
 * @name models.NotificationModel
 */
var notificationModel = angular.module('models.NotificationModel', []);

/**
 * @ngdoc object
 * @name models.NotificationModel
 * @description
 * Injectable model.
 *
 */
notificationModel.factory('NotificationModel', ['$timeout', function ($timeout) {

    var model = {};

    //---------------------------------------------------------------------
    //
    //  Properties
    //
    //---------------------------------------------------------------------

    /**
     * @ngdoc property
     * @name models.NotificationModel#list
     * @propertyOf models.NotificationModel
     * @description
     * List of notifications.
     * @returns {array} List of notifications.
     */
    model.list = null;

    //---------------------------------------------------------------------
    //
    //  Methods
    //
    //---------------------------------------------------------------------

    /**
     * @ngdoc function
     * @name models.NotificationModel#addItem
     *
     * @description
     * Adds a notification item.
     *
     * Below is a breakdown of the different types:
     *
     * | Type    | Default Color |
     * |---------|---------------|
     * | danger  | red           |
     * | success | green         |
     * | warning | yellow        |
     * | info    | blue          |
     *
     * @param {string} title provided, short message.
     * @param {string} type Style indicator. options: danger, success, warning, info.
     * @param {string} message of notification, long message (optional).
     * @param {int|number|object} timeout (Optional) Self destruct timer (in milliseconds).
     *
     * @methodOf models.NotificationModel
     *
     * @returns {object} Notification item.
     */
    model.addItem = function (title, type, message, timeout, showDetails) {
        //create list as necessary
        if (model.list === undefined || model.list === null || model.list.length === 0) {
            model.list = [];
        }
        //null checks
        if (title == null || type == null || title === '' || type === '') {
            return null;
        }
        message = message || "";
        timeout = timeout || 0;
        if (showDetails === undefined || showDetails == null) {
            showDetails = true;
        }
        //before adding the item, see if something already exists just like it
        for (var i = 0, n = model.list.length; i < n; i++) {
            var check = model.list[i];
            if (check.title === title && check.message === message) {
                return check;
            }
        }
        //create item
        var item = {'title': title, 'type': type, 'message': message, 'timeout': timeout, 'showDetails': showDetails};
        //create timeout if necessary
        if (timeout > 0) {
            item.timeoutPromise = $timeout(function () {
                model.removeItem(item);
            }, timeout);
        }
        //add to list
        model.list.push(item);
        return item;
    };

    /**
     * @ngdoc function
     * @name models.NotificationModel#removeItem
     *
     * @description
     * Removes a notification item.
     *
     * @methodOf models.NotificationModel
     *
     * @param {object} item to remove.
     *
     * @returns {boolean} successful indicator.
     */
    model.removeItem = function (item) {
        //null check
        if (model.list === undefined || model.list === null || model.list.length === 0 ||
            item === undefined || item === null) {
            return false;
        }
        //find item
        for (var i = 0, n = model.list.length; i < n; i++) {
            if (model.list[i] == item) {
                if (item.timeoutPromise != null) {
                    $timeout.cancel(item.timeoutPromise);
                }
                model.list.splice(i, 1);
                return true;
            }
        }
        //not found, return false
        return false;
    };

    /**
     * @ngdoc function
     * @name models.NotificationModel#removeAll
     *
     * @description
     * removes all of the existing messages.
     *
     * @methodOf models.NotificationModel
     */
    model.removeAll = function () {
        if (model.list === undefined) {
            model.list = null;
        }
        if (model.list === null || model.list.length === 0) {
            return model.list;
        }
        //basic create
        model.list = [];
        return model.list;
    };
    //---------------------------------------------------------------------
    //
    //  Initialize
    //
    //---------------------------------------------------------------------

    /**
     * @ngdoc function
     * @name models.NotificationModel#initialize
     *
     * @description
     * Initializes the model by setting necessary defaults.
     *
     * @methodOf models.NotificationModel
     */
    model.initialize = function () {

    };

    //when the model is ready
    //this calls the initialize
    //similar to some sort of
    //constructor
    model.initialize();
    return model;
}]);